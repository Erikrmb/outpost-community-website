"use client"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from "@/lib/validations/user";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

interface Props{
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

export default function AccountProfile({user, btnTitle} : Props){
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: '',
        }
    });
    return(
        <Form>
        </Form>
    )
}