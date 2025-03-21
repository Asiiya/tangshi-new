export interface Story {
  id: string;
  title: string;
  content: string;
  ageGroup: string;
  tags: string[];
  moral?: string;
}

export const stories: Story[] = [
  {
    id: '1',
    title: '龟兔赛跑',
    content: '从前，有一只骄傲的兔子，总是嘲笑乌龟走得慢。一天，乌龟忍无可忍，向兔子提出了比赛。比赛开始后，兔子很快就跑到了前面，看到远远落后的乌龟，它觉得胜券在握，于是在路边睡起觉来。当兔子醒来时，乌龟已经坚持不懈地爬到了终点。这个故事告诉我们：骄傲自满可能会导致失败，而坚持不懈则能克服困难取得成功。',
    ageGroup: '3-6岁',
    tags: ['寓言', '动物', '努力'],
    moral: '骄傲自满可能会导致失败，而坚持不懈则能克服困难取得成功。'
  },
  {
    id: '2',
    title: '狼来了',
    content: '从前，有一个放羊的小男孩，他经常喊"狼来了"来捉弄村民。村民们听到喊声就急忙跑来帮忙，却发现是男孩在开玩笑。一天，真的有狼来了，男孩大喊求救，但这次村民们以为又是恶作剧，没有人来帮忙。结果，小羊被狼吃掉了。这个故事告诉我们：诚实是非常重要的品质，说谎会使人失去信任。',
    ageGroup: '3-6岁',
    tags: ['寓言', '诚信', '教训'],
    moral: '诚实是非常重要的品质，说谎会使人失去信任。'
  },
  {
    id: '3',
    title: '小马过河',
    content: '有一只小马想要过河，但它不知道河水有多深。小马问松鼠，松鼠说河水很浅。又问老牛，老牛说河水很深。小马感到困惑，最后决定自己试一试。结果发现河水刚好到它的膝盖。小马明白了：对于松鼠来说河水很深，对于老牛来说河水很浅，只有亲自尝试才能知道真相。',
    ageGroup: '3-6岁',
    tags: ['寓言', '智慧', '勇气'],
    moral: '不同的人有不同的看法，有些事情需要自己亲身经历才能得出结论。'
  },
  {
    id: '4',
    title: '皇帝的新装',
    content: '从前有一个爱慕虚荣的皇帝，被两个骗子欺骗说能为他做一件只有聪明人才能看见的衣服。皇帝和他的大臣们都不想被认为是愚蠢的，所以假装看到了这件"衣服"。直到一次游行中，一个孩子喊出："皇帝什么都没穿！"人们才意识到真相。这个故事告诉我们：不要因为害怕别人的看法而违背自己的判断，诚实和真相比面子更重要。',
    ageGroup: '6-9岁',
    tags: ['童话', '诚实', '勇气'],
    moral: '不要因为害怕别人的看法而违背自己的判断，诚实和真相比面子更重要。'
  },
  {
    id: '5',
    title: '三只小猪',
    content: '从前有三只小猪，它们各自盖了一座房子来防御大灰狼。第一只小猪用稻草盖房子，第二只用木头，第三只则用砖头。大灰狼来了，轻易吹倒了稻草和木头房子，但砖头房子却坚固不摧。最后，三只小猪都躲进了砖头房子里，安全地生活下去。这个故事告诉我们：做事情需要认真负责，付出更多的努力往往能带来更好的结果和更多的安全感。',
    ageGroup: '3-6岁',
    tags: ['童话', '努力', '智慧'],
    moral: '做事情需要认真负责，付出更多的努力往往能带来更好的结果和更多的安全感。'
  },
  {
    id: '6',
    title: '农夫与蛇',
    content: '一个冬天，农夫发现一条快要冻死的蛇，出于同情把它放在怀里暖和。蛇恢复了力气后，却咬了农夫一口。临死前，农夫说："我救了你的命，你却要我的命，我真是活该。"这个故事告诉我们：善良是美德，但也要有判断力，不要对所有人或事物都无条件地信任。',
    ageGroup: '6-9岁',
    tags: ['寓言', '教训', '判断力'],
    moral: '善良是美德，但也要有判断力，不要对所有人或事物都无条件地信任。'
  },
  {
    id: '7',
    title: '丑小鸭',
    content: '一只与众不同的"小鸭子"出生在鸭妈妈的窝里，因为长相奇特被其他动物嘲笑和排斥。它伤心地离开家，独自生活。经过严冬的考验，春天到来时，它惊讶地发现自己变成了一只美丽的白天鹅。这个故事告诉我们：每个人都有自己的价值和美丽，不要因为别人的看法而否定自己。',
    ageGroup: '3-6岁',
    tags: ['童话', '成长', '自信'],
    moral: '每个人都有自己的价值和美丽，不要因为别人的看法而否定自己。'
  },
  {
    id: '8',
    title: '小红帽',
    content: '小红帽去看望生病的外婆，在路上遇到了大灰狼。狼问她去哪里，她天真地告诉了狼。狼抄近路先到了外婆家，吃掉了外婆，然后假扮成外婆等小红帽。机智的猎人最后救出了小红帽和外婆。这个故事告诉我们：不要轻易相信陌生人，遇到危险要保持警惕和机智。',
    ageGroup: '6-9岁',
    tags: ['童话', '警惕', '安全'],
    moral: '不要轻易相信陌生人，遇到危险要保持警惕和机智。'
  }
]; 