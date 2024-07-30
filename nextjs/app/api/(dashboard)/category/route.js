import connect from '../../../../lb/db';
import User from '../../../../lb/models/users';
import Category from '../../../../lb/models/category';
import { NextResponse } from 'next/server';
import {Types} from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;


export const GET = async (request) => {
    try{
        // const {serachParams} = new URL(request.url)
        // const userId = serachParams.get('userId');
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user id"}), {status: 400});
        }
        await connect()

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status:400})
        }

        const categories = await Category.find({user: new Types.ObjectId(userId),});
        return new NextResponse(JSON.stringify(categories), {status:200});


    }catch(error){
        return new NextResponse(JSON.stringify("Error in fecthing category:" + error.message), {status:400})
    }
}

export const POST = async (request) => {
    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        const {title} = await request.json();

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}, {status: 400}))
        }

        await connect();

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "No such user"}, {status: 404}))
        }

        const newCategory = new Category({title, user: new Types.ObjectId(userId)})
        await newCategory.save();
        return new NextResponse(JSON.stringify({message: "Category is created", category:newCategory}), {status:200})



    }catch(error){
        return new NextResponse(JSON.stringify("Error in creating category" + error.message), {status: 400});
    }
}

