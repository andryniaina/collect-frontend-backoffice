"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUsersSA } from "@/services/application/user.sa";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import { postForm } from "@/services/application/form.sa";
import { Calendar } from "../ui/calendar";
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Project Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Project description must be at least 3 characters" }),
  beginDate: z.date({ required_error: "Begin date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  agents: z
    .array(z.string()), // Schéma mis à jour pour agents
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

interface User {
  _id: string;
  name: string;
}

export const ProjectFormular: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const router = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const title = initialData ? "Edit project" : "Create project form";
  const description = initialData
    ? "Edit a project."
    : "Add a new project form";
  const toastMessage = initialData ? "Project updated." : "Project created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        beginDate: "",
        endDate: "",
        agents: [],
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    data.agents = selectedAgents;
    console.log("data", data);
    // const { _id, name }: any = await postForm(data);
    // router("/dashboard/project/builder/" + _id);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const getListUsers = () => {
    getUsersSA().then((resp) => {
      if (resp?.status == 200) {
        setUsers(resp.data);
      }
    });
  };

  const handleAgentSelect = (value: string) => {
    setSelectedAgents((prev) =>
      prev.includes(value) ? prev.filter((agent) => agent !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    getListUsers();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="beginDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Agents</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleAgentSelect}>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select agents" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
