"use client"

import { addCommentToPost, createThread } from "@/lib/actions/thread.actions";
import { CommentValidation, ThreadValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface Props{
    postId: string;
    currentUserImg: string;
    currentUserId: string;
}

export default function Comment({postId, currentUserImg, currentUserId} : Props){
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    });

    async function onSubmit(values: z.infer<typeof CommentValidation>){
        await addCommentToPost(postId, values.thread, JSON.parse(currentUserId), pathname);

        form.reset
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem className="flex items-center gap-3 w-full h-full">
                    <FormLabel>
                        <Image src={currentUserImg} alt="Profile photo" width={48} height={48} className="rounded-full object-cover"/>
                    </FormLabel>
                    <FormControl className="border-none bg-transparent">
                        <Input type="text" placeholder="Comments..." className="no-focus text-light-1 outline-none" {...field}/>
                    </FormControl>
                    
                    </FormItem>
                )}
            />
            <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    )
}