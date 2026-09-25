import { flag } from 'flags/next';

export const HeadingFlag = flag({
  key: "dashboard-heading", 
  async decide() {
    return process.env.ENABLE_FEATURE === 'true';
  },
});

export const LearningCardFlag=flag({
    key: "Learning-Card-format",
    async decide(){
        return process.env.LEARNING_CARD_FEATURE === 'true';
    }

});