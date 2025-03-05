import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InserSelectedAiAssistants = mutation({
    args: {
        records: v.array(v.object({
            id: v.number(),
            name: v.string(),
            title: v.string(),
            image: v.string(),
            instruction: v.string(),
            userInstruction: v.string(),
            sampleQuestions: v.array(v.string()),
            aiModelId: v.optional(v.string()),
        })),
        uid: v.id('users'),
    },
    handler: async (ctx, args) => {
        try {
            const insertedIds = await Promise.all(
                args.records.map(async (record) => {
                    return await ctx.db.insert('userAiAssistants', {
                        id: record.id,
                        name: record.name,
                        title: record.title,
                        image: record.image,
                        instruction: record.instruction,
                        userInstruction: record.userInstruction,
                        sampleQuestions: record.sampleQuestions,
                        aiModelId: 'Google: Gemini 2.0 Flash',
                        uid: args.uid,
                    });
                })
            );
            return insertedIds;
        } catch (error) {
            throw new Error("Error in InserSelectedAiAssistants");
        }
    }
})


export const GetAiAssistants = query({
    args:{
        uid:v.id('users'),
    },
    handler:async(ctx,args)=>{
        try {

            const assistans = await ctx.db.query('userAiAssistants')
            .filter(q=>q.eq(q.field('uid'),args.uid))
            .collect()
            return assistans;
            
        } catch (error) {
            throw new Error("Error in GetAiAssistants")
            
        }
    }
})



export const UpdateUserAiAssistants = mutation({
    args: {
        id: v.id('userAiAssistants'),
        userInstruction: v.string(),
        aiModelId: v.string(),
      
    },
    handler: async (ctx, args) => {
        try {
          const result =   await ctx.db.patch(args.id, {
                userInstruction: args.userInstruction,
                aiModelId: args.aiModelId,
            });
            return result;
        } catch (error) {
            throw new Error("Error in UpdateUserAiAssistants");
        }
    }

})


