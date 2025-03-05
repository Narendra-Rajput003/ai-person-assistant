import { mutation, query } from "./_generated/server";
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
         const user = await ctx.db
         .query('users')
         .filter(q => q.eq(q.field('email'), args.email))
         .collect();



        if(user.length==0){
           
            const data ={
                name:args.name,
                email:args.email,
                picture:args.picture,
                credits:6000,
              
            }

            const result = await ctx.db.insert('users',data);
            return data;
        }

        return user[0];
        

        
       } catch (error) {
        console.error('User creation failed:', error);
        throw new Error('Failed to create user');
       }
    }
})


export const GetUserInfo=query({
    args:{
        email:v.string(),
    },
    handler:async(ctx,args)=>{
            try {
               const user = await ctx.db.query('users')
               .filter(q=>q.eq(q.field('email'),args.email))
               .collect()
               return user[0];
            } catch (error) {
                throw new Error("Error in GetUserInfo")
                
            }
    }
})