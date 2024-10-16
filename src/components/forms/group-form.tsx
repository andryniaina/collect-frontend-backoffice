"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import {
  createUserGroupSa,
  updateGroupSa,
} from "@/services/application/user.sa";
import MembersComponent from "@/presentations/screens/Users/Groups/MembersComponent";
import { useQueryClient } from "@tanstack/react-query";
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
  users: any;
}

export const GroupForm: React.FC<ProductFormProps> = ({
  initialData,
  users,
}) => {
  const initialMembers = initialData?.users ?? [];
  const [name, setName] = useState<string>(initialData?.name ?? "");
  const [members, setMembers] = useState(initialMembers);
  const router = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit group" : "Create group";
  const description = initialData ? "Edit a group." : "Add a new group";
  const toastMessage = initialData ? "Group updated." : "Group created.";
  const action = initialData ? "Save changes" : "Create";
  const isUpdating = initialData !== null;

  const form = useForm<ProductFormValues>();

  const queryClient= useQueryClient()

  const onSubmit = async () => {
    const request = {
      name,
      users: members ? members.map((member: any) => member._id) : [],
    };
    try {
      console.log("Request => ", request);
      if (!isUpdating) {
        const response = await createUserGroupSa(request);
        console.log(response.data);
        router("/dashboard/users/groups");
      } else {
        const response = await updateGroupSa(initialData._id ?? "", request);
        console.log(response.data);
        queryClient.invalidateQueries({ queryKey: ["group"+initialData?._id] });
        router("/dashboard/users/groups");
      }
      router("/dashboard/users/groups");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-1">
            <div className="max-w-64">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input
                      disabled={loading}
                      placeholder="Group name"
                      {...field}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <MembersComponent
              users={users}
              initialMembers={initialMembers}
              setGroupMembers={setMembers}
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
