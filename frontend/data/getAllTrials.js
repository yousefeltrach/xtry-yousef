import { api } from "../api.js"; 

export async function getAllTrials(){
    try {

        const trialRecords = await api.trialPlan.findMany({ select: { name: true, planTitle: true } });
        const trialPlanNames = trialRecords.map(record => record.name);
        const planTitles  = trialRecords.map(record => record.planTitle);  

        return { trialPlanNames, planTitles };

    } catch (error) {
        console.error({"Error": error, "return": {trialPlanNames, planTitles }});
    }
}
