import { HeadingFlag } from "@/flag";
import { LearningCardFlag } from "@/flag";
import { HorizontalLearningCard } from "../components/horizontalLearningCard";
import { LearningCard } from "../components/learningcard";

export default async function FeatureFlag() {
  const showHeadingFlag = await HeadingFlag();
  const showLearningCardFlag= await LearningCardFlag();

  return (
    <div className="space-y-8">
      <div>
        {showHeadingFlag?(<h1 className="text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
          My Learnings in Feature Flag
        </h1>):(<h1 className="text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
          My Learnings
        </h1>)}
        
        
      </div>
       {showLearningCardFlag?(
        <div>
        <HorizontalLearningCard
         title="Feature Flag"
          description="Learnt what is the use of Feature Flag"
          bullets={[
            "Feature Flags are used to turn on or off a particular feature whenever needed",
            "Feature Flags can be implemented using 'flags' library created by Next.js",
            "We can remove a particular feature by simply seing the flag varible to false or true",
          ]}
          />
         
        </div>
       ):(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-self-auto">
        <LearningCard
          title="Feature Flag"
          description="Learnt what is the use of Feature Flag"
          bullets={[
            "Feature Flags are used to turn on or off a particular feature whenever needed",
            "Feature Flags can be implemented using 'flags' library created by Next.js",
            "We can remove a particular feature by simply seing the flag varible to false or true",
          ]}
       
        />
        
      </div>)}
     
    </div>
  );
}