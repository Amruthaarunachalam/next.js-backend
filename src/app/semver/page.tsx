import { HeadingFlag } from "@/flag";
import { LearningCardFlag } from "@/flag";
import { HorizontalLearningCard } from "../components/horizontalLearningCard";
import { LearningCard } from "../components/learningcard";

export default async function SemVer() {
  const showHeadingFlag = await HeadingFlag();
  const showLearningCardFlag= await LearningCardFlag();

  return (
    <div className="space-y-8">
      <div>
        {showHeadingFlag?(<h1 className="text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
          My Learnings in Semantic Versioning
        </h1>):(<h1 className="text-2xl font-bold tracking-tight text-gray-900  dark:text-white">
          My Learnings
        </h1>)}
        
        
      </div>
       {showLearningCardFlag?(
        <div>
        <HorizontalLearningCard
         title="Semantic Versioning"
          description="Learnt the basics of versioning software with MAJOR.MINOR.PATCH."
          bullets={[
            "When to increment MAJOR (Breaking changes)",
            "When to increment MINOR (New features, backward compatible)",
            "When to increment PATCH (Bug fixes)",
          ]}
          />
          <HorizontalLearningCard
           title="Generating Release Notes"
          description="Learnt how to generate release notes in github."
          bullets={[
            "First to create a tag that specifies the version of the application",
            "specify the tag and specify the target branch",
            "click on the generate notes button, you can change if you want",
            "click pre-release if it is pre-release version else click on latest option"
          ]}
        />
        </div>
       ):(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-self-auto">
        <LearningCard
          title="Semantic Versioning"
          description="Learnt the basics of versioning software with MAJOR.MINOR.PATCH."
          bullets={[
            "When to increment MAJOR (Breaking changes)",
            "When to increment MINOR (New features, backward compatible)",
            "When to increment PATCH (Bug fixes)",
          ]}
       
        />
         <LearningCard
          title="Generating Release Notes"
          description="Learnt how to generate release notes in github."
          bullets={[
            "First to create a tag that specifies the version of the application",
            "specify the tag and specify the target branch",
            "click on the generate notes button, you can change if you want",
            "click pre-release if it is pre-release version else click on latest option"
          ]}
       
        />
      </div>)}
     
    </div>
  );
}