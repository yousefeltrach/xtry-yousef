import TrialForm from "./TrialForm";
import {initTrialPlanInput} from "../../data/contstants";

export default function NewTrialPlan() {

    // console.log({"Initial Trial Plan": initTrialPlanInput});

  return (
      <TrialForm initTrialPlanInput={initTrialPlanInput} trialPlanId={null} />
  );
};
