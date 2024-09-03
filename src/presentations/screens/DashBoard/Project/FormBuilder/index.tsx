import React, { useEffect, useState } from "react";
import FormBuilder from "@/components/FormItem";
import "./index.css";
import {
  findForm,
  postForm,
  updateForm,
} from "../../../../../services/application/form.sa";
import { useParams, useNavigate } from "react-router-dom";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { getUsersSA } from "@/services/application/user.sa";
import { useQueryClient } from "@tanstack/react-query";
import { ISettings } from "@/data/types/settingsTypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Item from "./Item";
import Group from "./Group";

const FormBuilderPage: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([
  ]);

  const updateGroupName = (groupId: string, newName: string) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId ? { ...group, name: newName } : group
      )
    );
  };

  const moveItem = (
    itemId: string,
    toGroupId: string | null,
    index: number
  ) => {
    setGroups((prevGroups) => {
      const newGroups = prevGroups.map((group) => ({
        ...group,
        items: [...group.items],
      }));
      let item: any | undefined;

      // Find and remove the item from its current location
      for (let i = 0; i < newGroups.length; i++) {
        const itemIndex = newGroups[i].items.findIndex(
          (i: any) => i.id === itemId
        );
        if (itemIndex !== -1) {
          [item] = newGroups[i].items.splice(itemIndex, 1);
          break;
        }
      }

      if (!item) {
        const unassignedIndex = questions.findIndex(
          (i) => i.id === itemId
        );
        if (unassignedIndex !== -1) {
          [item] = questions.splice(unassignedIndex, 1);
          setQuestions([...questions]);
        }
      }

      if (!item) return prevGroups;

      // Add item to the new group or unassigned items
      if (toGroupId === null) {
        setQuestions((prev) => {
          const newItems = [...prev];
          newItems.splice(index, 0, item!);
          return newItems;
        });
      } else {
        const targetGroup = newGroups.find((g) => g.id === toGroupId);
        if (targetGroup) {
          targetGroup.items.splice(index, 0, item);
        }
      }

      return newGroups;
    });
    console.log("questions after move", questions);
  };

  const queryClient = useQueryClient();
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    getUsersSA().then((response) => {
      const users = response.data;
      const newOptions = users.map((user: any) => {
        return {
          label: user.email,
          value: user.email,
        };
      });
      setOptions(newOptions);
    });
  }, []);
  const params = useParams();
  const [formName, setFormName] = useState("Form Name");
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleAddQuestion = (index: number) => (question: any) => {
    const newQuestions = [...questions];
    newQuestions[index]["label"] = question.label;
    if (question.type) newQuestions[index]["type"] = question.type;
    newQuestions[index]["settingsData"] = question.settingsData;
    setQuestions(newQuestions);
  };

  const handleAddNewGroup = () => {
    setGroups([...groups, { id: "group" + (groups.length + 1), name: "Group " + (groups.length + 1), items: [] }]);
  };

  const handleAddNewFormBuilder = () => {
    setQuestions([...questions, { label: "", type: "" }]);
  };

  useEffect(() => {
    findForm(params.id ?? "")
      .then((response: any) => {
        setFormName(response.name);
        setQuestions([
          ...response.fields.map((field: any) => {
            return { id: field.name, label: field.name, type: field.type };
          }),
        ]);
        console.log(response.fields);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deploy = async () => {
    let payload: any = {};
    payload["fields"] = questions.map(
      ({
        label,
        type,
        settingsData,
      }: {
        label: any;
        type: any;
        settingsData: ISettings;
      }) => {
        const field: any = { name: label, type };
        if (settingsData) {
          field.description = settingsData.questionOptions?.guidance;
          field.required = settingsData.questionOptions?.mandatory;
          field.default = settingsData.questionOptions?.default;
          field.group = 'Default';
          (field.validation = {
            message: settingsData.validationCriteria?.errorMessage,
            comparator: settingsData.validationCriteria?.comparator,
            value: settingsData.validationCriteria?.value,
          }),
            (field.formula = settingsData.validationCriteria?.formula);
        }
        return field;
      }
    );
    payload["status"] = "Deployed";
    payload["groups"] = [...groups.map((group: any) => group.name),'Default'];
    console.log({ payload });
      await updateForm(params.id ?? "", payload);
    navigate("/dashboard/project");
  };

  const saveAsDraft = async () => {
    let payload: any = {};
    payload["fields"] = questions.map(({ label, type }: any) => {
      return { name: label, type };
    });
    payload["status"] = "Draft";
    console.log({ payload });
    await updateForm(params.id ?? "", payload);
    queryClient.refetchQueries({ queryKey: ["forms"] });
    navigate("/dashboard/project");
  };

  return (
    <div className="container-builder">
      <div className="form-builder-page">
        <DndProvider backend={HTML5Backend}>
          <h1>{formName}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            
            <div
              style={{
                marginTop: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "5px",
                }}
              >
                Default Group
              </h2>
              {questions.map((item, index) => (
                <Item
                  key={item.label}
                  id={item.label}
                  label={item.label}
                  index={index}
                  groupId={null}
                  moveItem={moveItem}
                  keyValue={index}
                  question={item.label}
                  questions={questions}
                  onAddQuestion={handleAddQuestion(index)}
                />
              ))}
            </div>
            {groups.map((group) => (
              <Group updateGroupName={updateGroupName} questions={questions} handleAddQuestion={handleAddQuestion} key={group.id} group={group} moveItem={moveItem} />
            ))}
          </div>
          <button
            className="add-new-form-builder-button"
            onClick={handleAddNewFormBuilder}
          >
            + Add New Question
          </button>
          <button
            className="add-new-form-builder-button"
            onClick={handleAddNewGroup}
          >
            + Add New Group
          </button>
          <MultipleSelector
            key={JSON.stringify(options)}
            defaultOptions={options}
            placeholder="Share this form with"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no user found.
              </p>
            }
          />
          <button className="add-new-form-builder-button" onClick={saveAsDraft}>
            Save as draft
          </button>
          <button className="add-new-form-builder-button" onClick={deploy}>
            Deploy
          </button>
        </DndProvider>
      </div>
    </div>
  );
};

export default FormBuilderPage;
