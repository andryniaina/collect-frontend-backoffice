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

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const SettingsModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleAddConditionClick = () => {
    console.log("add condition");
    setConditions([...conditions, { field: "", comparator: "", value: "" }]);
  };

  const [questionOptions, setQuestionOptions] = useState({
    dataColumnName: "",
    guidance: "",
    default: "",
    mandatory: false,
  });

  interface Condition {
    field: string;
    comparator: string;
    value: string;
  }

  const [conditions, setConditions] = useState<Condition[]>([]);

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
          <TabsTrigger value="validation">Validation Criteria</TabsTrigger>
        </TabsList>
        <TabsContent value="options" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dataColumnName">Data Column Name</Label>
            <Input
              id="dataColumnName"
              placeholder="Enter your data column name"
              value={questionOptions.dataColumnName}
              onChange={(e) =>
                setQuestionOptions({
                  ...questionOptions,
                  dataColumnName: e.target.value,
                })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="guidance">Guidance Hint</Label>
            <Input
              id="guidance"
              value={questionOptions.guidance}
              onChange={(e) =>
                setQuestionOptions({
                  ...questionOptions,
                  guidance: e.target.value,
                })
              }
              placeholder="Enter your guidance hint"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="default">Defalult Response</Label>
            <Input
              id="default"
              value={questionOptions.default}
              onChange={(e) =>
                setQuestionOptions({
                  ...questionOptions,
                  default: e.target.value,
                })
              }
              placeholder="Enter your default response"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="required">Mandatory Response</Label>
            <Select
              defaultValue={questionOptions.mandatory ? "true" : "false"}
              onValueChange={(value) =>
                setQuestionOptions({
                  ...questionOptions,
                  mandatory: value === "true",
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
          {conditions.map((condition, index) => (
            <ConditionItem
              condition={condition}
              setCondition={(newCondition: any) =>
                setConditions(
                  conditions.map((c, i) => (i === index ? newCondition : c))
                )
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
              <Select>
                <SelectTrigger className="flex items-center space-x-2">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Comparator</SelectLabel>
                    <SelectItem value="true">=</SelectItem>
                    <SelectItem value="false">!=</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                    <SelectItem value="not-answered">Not Answered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type">Value</Label>
              <Input id="type" placeholder="Enter your value" />
            </div>
          </div>
          <div className="condition-container-with-three-select-inputs">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="type">Error Message</Label>
              <Input id="type" placeholder="Enter your value" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
