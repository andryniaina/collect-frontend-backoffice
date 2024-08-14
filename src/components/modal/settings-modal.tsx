"use client";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import "./settings-modal.css";
import { FaCog } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConditionItem } from "@/components/modal/condition";
import { ISettings } from "@/data/types/settingsTypes";
import { ICondition as Condition } from "@/data/types/settingsTypes";
import { set } from "date-fns";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  settingsData: ISettings;
  setSettingsData: (settingsData: ISettings) => void;
  questions: any[];
}

export const SettingsModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  settingsData,
  setSettingsData,
  questions,
}) => {
  const handleAddConditionClick = () => {
    console.log("add condition");
    setSettingsData({
      ...settingsData,
      skipLogic: {
        ...settingsData.skipLogic,
        conditions: [
          ...(settingsData.skipLogic?.conditions ?? []),
          { field: "", comparator: "", value: "" },
        ],
      },
    });
  };

  return (
    <Modal
      title="Settings"
      description="Manage your field settings."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tabs defaultValue="options" className="space-y-4">
        <TabsList>
          <TabsTrigger value="options">Question Options</TabsTrigger>
          <TabsTrigger value="logic">Skip Logic</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>
        <TabsContent value="options" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dataColumnName">Data Column Name</Label>
            <Input
              id="dataColumnName"
              placeholder="Enter your data column name"
              value={settingsData.questionOptions?.columnName ?? ""}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  questionOptions: {
                    ...settingsData.questionOptions,
                    columnName: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="guidance">Guidance Hint</Label>
            <Input
              id="guidance"
              value={settingsData.questionOptions?.guidance ?? ""}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  questionOptions: {
                    ...settingsData.questionOptions,
                    guidance: e.target.value,
                  },
                })
              }
              placeholder="Enter your guidance hint"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="default">Defalult Response</Label>
            <Input
              id="default"
              value={settingsData.questionOptions?.default ?? ""}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  questionOptions: {
                    ...settingsData.questionOptions,
                    default: e.target.value,
                  },
                })
              }
              placeholder="Enter your default response"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="required">Mandatory Response</Label>
            <Select
              defaultValue={
                settingsData.questionOptions?.mandatory ? "true" : "false"
              }
              onValueChange={(value) =>
                setSettingsData({
                  ...settingsData,
                  questionOptions: {
                    ...settingsData.questionOptions,
                    mandatory: value === "true",
                  },
                })
              }
            >
              <SelectTrigger className="flex items-center space-x-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Required</SelectLabel>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        <TabsContent value="logic" className="space-y-4">
          {settingsData.skipLogic?.conditions?.map((condition, index) => (
            <ConditionItem
              condition={condition}
              questions={questions}
              setCondition={(newCondition: any) =>
                setSettingsData({
                  ...settingsData,
                  skipLogic: {
                    ...settingsData.skipLogic,
                    conditions: settingsData.skipLogic?.conditions?.map(
                      (c, i) => (i === index ? newCondition : c)
                    ),
                  },
                })
              }
            />
          ))}
          <div
            className="bg-black text-white border-none p-2.5 rounded cursor-pointer w-3/5 font-semibold text-sm flex items-center justify-center"
            onClick={handleAddConditionClick}
          >
            +ADD ANOTHER CONDITION
          </div>
        </TabsContent>
        <TabsContent value="validation" className="space-y-4">
          <div className="condition-container-with-three-select-inputs">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type">Comparator</Label>
              <Select
                defaultValue={settingsData.validationCriteria?.comparator ?? ""}
                onValueChange={(value) =>
                  setSettingsData({
                    ...settingsData,
                    validationCriteria: {
                      ...settingsData.validationCriteria,
                      comparator: value,
                    },
                  })
                }
              >
                <SelectTrigger className="flex items-center space-x-2">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Comparator</SelectLabel>
                    <SelectItem value="=">=</SelectItem>
                    <SelectItem value="!=">!=</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                    <SelectItem value="not-answered">Not Answered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="validationValue">Value</Label>
              <Input
                id="validationValue"
                placeholder="Enter your value"
                value={settingsData.validationCriteria?.value ?? ""}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    validationCriteria: {
                      ...settingsData.validationCriteria,
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="condition-container-with-three-select-inputs">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="errorMessage">Error Message</Label>
              <Input
                id="errorMessage"
                placeholder="Enter your error message"
                value={settingsData.validationCriteria?.errorMessage ?? ""}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    validationCriteria: {
                      ...settingsData.validationCriteria,
                      errorMessage: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="condition-container-with-three-select-inputs">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="formula">Formula</Label>
              <Input
                id="formula"
                placeholder="Enter your formula"
                value={settingsData.validationCriteria?.formula ?? ""}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    validationCriteria: {
                      ...settingsData.validationCriteria,
                      formula: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
