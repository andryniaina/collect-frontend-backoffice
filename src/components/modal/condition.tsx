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

interface Condition {
    field: string;
    comparator: string;
    value: string;
}

export const ConditionItem = ({condition, setCondition}: {condition: Condition, setCondition: any}) => {
    return (
        <div className="condition-container-with-three-select-inputs">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="type">Field</Label>
            <Select onValueChange={(value) => setCondition({...condition, field: value})}>
              <SelectTrigger className="flex items-center space-x-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Field</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="type">Comparator</Label>
            <Select onValueChange={(value) => setCondition({...condition, comparator: value})}>
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
          <Label htmlFor="value">Value</Label>
          <Input id="value" placeholder="Enter your value" value={condition.value} onChange={(e) => setCondition({...condition, value: e.target.value})} />
        </div>
        </div>)
}