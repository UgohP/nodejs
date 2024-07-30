import connect from '../../../../../lb/db';
import User from '../../../../../lb/models/users';
import Category from '../../../../../lb/models/category';
import Blog from '../../../../../lb/models/blog';
import { NextResponse } from 'next/server';
import {Types} from "mongoose";

export const GET = async(request, {params}) => {
    const blogId = params.blog;

    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');


        console.log(`categoryId: ${categoryId}`);
        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "No user with ID"}), {status: 400})
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "No category with ID"}), {status: 400})
        }

        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "No blog with ID"}), {status: 400})
        }
        await connect()

        const user = await User.findById(userId)

        if (!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404})
        }

        const category = await Category.findOne({_id: categoryId, user: userId})

        if(!category) {
            return new NextResponse(JSON.stringify({message: "Category not found"}), {status: 404})
        }
        
        const blog = await Blog.findOne({_id:blogId, user:userId, category:categoryId})
        
        if(!blog){
            return new NextResponse(JSON.stringify({message: "Blog not found"}), {status:500});
        }
        
        return new NextResponse(JSON.stringify({blog}), {status:200})
    }catch(error){
        return new NextResponse(JSON.stringify("Error in updating category" + error.message), {status: 500});
    }
}


export const PATCH = async(request, {params}) => {
    const blogId = params.blog;

    try{
        const body = await request.json();
        const { title, description} = body

        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "No user with ID"}), {status: 400})
        }


        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "No blog with ID"}), {status: 400})
        }
        await connect()

        const user = await User.findById(userId)

        if (!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404})
        }

        
        const blog = await Blog.findOne({_id:blogId, user:userId})
        
        if(!blog){
            return new NextResponse(JSON.stringify({message: "Blog not found"}), {status:500});
        }
        const updateBlog = await Blog.findByIdAndUpdate(
            blogId, 
            {title, description}, 
            {new:true})
        return new NextResponse(JSON.stringify({message: "Blog Updated", blog:updateBlog}), {status:200})

    }catch(error){
        return new NextResponse(JSON.stringify("Error in updating category" + error.message), {status: 500});
    }
}


export const DELETE = async(request, {params}) => {
    const blogId = params.blog;
    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        console.log(`userId: ${userId}`);
        console.log(`blogId: ${blogId}`);


        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "No user with ID"}), {status: 400})
        }


        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "No blog with ID"}), {status: 400})
        }
        await connect()

        const user = await User.findById(userId)

        if (!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404})
        }

        
        const blog = await Blog.findOne({_id:blogId, user:userId})
        
        if(!blog){
            return new NextResponse(JSON.stringify({message: "Blog not found"}), {status:500});
        }

        const deleteBlog = await Blog.findByIdAndDelete(blogId)
        return new NextResponse(JSON.stringify({message: "Blog deleted"}), {status:200})

    }catch(error){
        return new NextResponse(JSON.stringify("Error in updating category" + error.message), {status: 500});
    }
}
