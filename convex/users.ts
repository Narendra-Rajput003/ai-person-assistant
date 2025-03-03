import { mutation } from "./_generated/server";
import { v } from "convex/values";



export const CreateUser = mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
    },
    handler:async(ctx,args)=>{
      
       try {

         //if user already exis
         const existingUser = await ctx.db
         .query('users')
         .filter(q => q.eq(q.field('email'), args.email))
         .first(); // Execute the query and get the first result

     if (existingUser) {
         return existingUser._id; // Access the `_id` property of the 
     }


        const userId = await ctx.db.insert('users',{
            name:args.name,
            email:args.email,
            picture:args.picture,
            credits:'6000'
        })

        return userId;
       
        
       } catch (error) {
        console.error('User creation failed:', error);
        throw new Error('Failed to create user');
       }
    }
})