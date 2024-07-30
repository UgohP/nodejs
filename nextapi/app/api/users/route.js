import connect from '../../../lb/db';
import User from '../../../lb/models/users';
import { NextResponse } from 'next/server';

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
        const body = request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({messagae: "User is created", user: newUser}), {status: 200});
    }catch(error){
        return new NextResponse("Error in creating user" + error.message, {status: 500});
    }

}