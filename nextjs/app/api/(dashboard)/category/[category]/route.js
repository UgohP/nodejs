import connect from '../../../../../lb/db';
import User from '../../../../../lb/models/users';
import Category from '../../../../../lb/models/category';
import { NextResponse } from 'next/server';
import {Types} from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;


export const PATCH = async (request, {params}) => {
    const categoryId = params.category

    try{
        const body = await request.json();
        const {title} = body;

        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        console.log(`categoryId: ${categoryId}`);
        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "No user with ID"}), {status: 400})
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "No category with ID"}), {status: 400})
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
        const updateCategory = await Category.findByIdAndUpdate(
            categoryId, 
            {title}, 
            {new: true},
        )

        return new NextResponse(JSON.stringify({message: "Category is updated", category: updateCategory}), {status: 200})


    }catch(error){
        return new NextResponse(JSON.stringify("Error in updating category" + error.message), {status: 500});
    }
}


export const DELETE = async (request, {params}) => {
    const categoryId = params.category
    try{
        const url = new URL(request.url)
        const searchParams = url.searchParams;
        const userId = searchParams.get('userId');

        console.log(`categoryId: ${categoryId}`);
        console.log(`userId: ${userId}`);

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "No user with ID"}), {status: 400})
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "No category with ID"}), {status: 400})
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

        await Category.findByIdAndDelete(categoryId)
        return new NextResponse(JSON.stringify({message: "Category is deleted"}), {status: 200})
    }
    catch(error){
        return new NextResponse(JSON.stringify("Error in deleting category" + error.message), {status: 500});
    }
}