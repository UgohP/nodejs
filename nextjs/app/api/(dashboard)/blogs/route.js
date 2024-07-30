import connect from '../../../../lb/db';
import User from '../../../../lb/models/users';
import Category from '../../../../lb/models/category';
import Blog from '../../../../lb/models/blog';
import { NextResponse } from 'next/server';
import {Types} from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;


export const GET = async( request) =>{
    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');
        const searchKeywords = searchParams.get('keywords');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        console.log(`categoryId: ${categoryId}`);
        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}, {status: 400}))
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "No category with ID"}), {status: 400})
        }

        await connect();

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "No such user"}, {status: 404}))
        }

        const category = await Category.findOne({_id: categoryId, user: userId})

        if(!category) {
            return new NextResponse(JSON.stringify({message: "Category not found"}), {status: 404})
        }

        
        const filter = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId),
        }
        
        if(searchKeywords){
        filter.$or = [
            {title: {$regex: searchKeywords, $options: 'i'}},
            {description: {$regex: searchKeywords, $options: 'i'}}
        ]}

        if(startDate && endDate){
            filter.createdAt = {$gte: new Date(startDate), $lte: new Date(endDate)}
        }else if(startDate){
            filter.createdAt = {$gte: new Date(startDate)}
        }else if(endDate){
            filter.createdAt = {$gte: new Date(endDate)}
        }


        const blogs = (await Blog.find(filter)).sort({createdAt: "asc"})
        return new NextResponse(JSON.stringify({blogs}), {status: 200});

    }catch(error){
        return new NextResponse(JSON.stringify("Error in creating category" + error.message), {status: 400});
    }
}

export const POST = async(request) =>{
    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId');
        const body = await request.json()
        const {title, description} = body

        console.log(`categoryId: ${categoryId}`);
        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}, {status: 400}))
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "No category with ID"}), {status: 400})
        }

        await connect();

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "No such user"}, {status: 404}))
        }

        const category = await Category.findOne({_id: categoryId, user: userId})

        if(!category) {
            return new NextResponse(JSON.stringify({message: "Category not found"}), {status: 404})
        }

        const newBlog = new Blog({title, description, user: new Types.ObjectId(userId), category: new Types.ObjectId(categoryId)})
        await newBlog.save();
        return new NextResponse(JSON.stringify({message: "Category is created", blog:newBlog}), {status:200})

    }catch(error){
        return new NextResponse(JSON.stringify("Error in creating category" + error.message), {status: 400});
    }
}