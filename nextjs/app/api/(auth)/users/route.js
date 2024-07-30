import connect from '../../../../lb/db';
import User from '../../../../lb/models/users';
import { NextResponse } from 'next/server';
const ObjectId = require("mongoose").Types.ObjectId;
import {Types} from "mongoose";

export const GET = async () => {
    try{
        await connect();
        const users = await User.find()
        return new NextResponse(JSON.stringify(users), {status: 200});
    }catch(error){
        return new NextResponse("Error in fetching users" + error.message, {status: 500})
    }
}

export const POST = async (request) => {
    try{
        const body = await request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({messagae: "User is created", user: newUser}), {status: 200});
    }catch(error){
        return new NextResponse("Error in creating user" + error.message, {status: 500})
    }

}

export const PATCH = async (request) => {
    try{
        const body = await request.json();
        const {userId, newUsername} = body;
        await connect();
        if(!userId || !newUsername){
            return new NextResponse(JSON.stringify({message: "ID or newusername not found"}), {status: 400})
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invlaid user ID"}), {status: 400})
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            {_id:userId}, 
            {username: newUsername}, 
            {new: true}
        );
        if(!updatedUser){
            return new NextResponse(JSON.stringify({message: "User not found in the database"}), {status: 400})
        }
        return new NextResponse(JSON.stringify({message: "User updated", user: updatedUser}), {status: 200})

    }catch(error){
        return new NextResponse("Error" + error.message, {status: 500})
    }
}

export const DELETE = async (request) => {
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');

        if(!userId){
            return new NextResponse(JSON.stringify({message: "User ID not found"}), {status: 400})
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid user ID"}), {status: 400})
        }

        await connect();

        const deleteUser = await User.findByIdAndDelete( new Types.ObjectId(userId));

        if(!deleteUser){
            return new NextResponse(JSON.stringify({message: "User not found in the database"}), {status: 400})
        }

        return new NextResponse(JSON.stringify({message: "User deleted", user: deleteUser}), {status: 200})
    }catch(error){
        return new NextResponse("Error" + error.message, {status: 500})
    }
}