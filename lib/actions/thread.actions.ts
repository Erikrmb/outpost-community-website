"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({text, author, communityId, path}: Params){
    try{
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })

        revalidatePath(path);

    }catch(error: any){
        throw new Error(error.message)
    }
    
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    const skipAmount = (pageNumber-1) * pageSize;

    const postQuery = Thread.find({ parentId: { $in: [null, undefined]}})
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
        path: "author",
        model: User,
    })
    .populate({
        path: "children",
        populate: {
            path: "author",
            model: User,
            select: "_id name parentId image",
        },
    });

    const totalPostsCount = await Thread.countDocuments({ parentId : { $in: [null, undefined]},})

    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

export async function fetchPostById(id: string){
    connectToDB();

    try {
        const post = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: '_id id name image'
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }
                }
            ]
        }).exec();

        return post;
    }catch(error: any){
        throw new Error(error.message)
    }
}

export async function addCommentToPost(
    postId: string,
    commentText: string,
    userId: string,
    path: string
){
    try{
        connectToDB();

        const originalPost = await Thread.findById(postId);

        if(!originalPost){
            throw new Error("Post not found")
        }

        const commentPost = new Thread({
            text: commentText,
            author: userId,
            parentId: postId,
        })

        const savedCommentPost = await commentPost.save();

        originalPost.children.push(savedCommentPost._id);

        await originalPost.save();

        revalidatePath(path)
    }catch(error: any){
        throw new Error(error.message)
    }
}