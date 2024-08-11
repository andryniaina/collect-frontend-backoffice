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
import { useState } from "react";
import { ICondition as Condition } from "@/data/types/settingsTypes";

export const ConditionItem = ({condition, setCondition, questions}: {condition: Condition, setCondition: any, questions: any[]}) => {
    return (
        <div className="condition-container-with-three-select-inputs">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="type">Field</Label>
            <Select defaultValue={condition.field} onValueChange={(value) => setCondition({...condition, field: value})}>
              <SelectTrigger className="flex items-center space-x-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Field</SelectLabel>
                  {questions.map((question, index) => (
                    <SelectItem value={question.label} key={index}>{question.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="type">Comparator</Label>
            <Select defaultValue={condition.comparator ?? "="} onValueChange={(value) => setCondition({...condition, comparator: value})}>
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
          <Label htmlFor="value">Value</Label>
          <Input id="value" placeholder="Enter your value" value={condition.value} onChange={(e) => setCondition({...condition, value: e.target.value})} />
        </div>
        </div>)
}