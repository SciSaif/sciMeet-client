interface PromptVariables {
    relation: string;
    years: number;
    bot_name: string;
    my_name: string;
    bot_age: number;
    bot_gender: string;
    adjectives: string;
    my_age: number;
    my_gender: string;
    first_message: string;
}

export function createPrompt(variables: PromptVariables): string {
    const {
        relation,
        years,
        bot_name,
        my_name,
        bot_age,
        bot_gender,
        adjectives,
        my_age,
        my_gender,
        first_message,
    } = variables;

    const prompt = `you are my ${relation} and we know each other for ${years} years.
    your name is ${bot_name}, and my name is ${my_name}.
    Talk to me like my ${relation} will probably talk in a chat app.
    Make up facts when needed and make it sound like its a normal chat with ${relation}.
    Here are some details about you:
    you are ${bot_age} years old.
    you are a ${bot_gender}.
    you are ${adjectives}
    Here are some details about me:
    I am ${my_age} years old.
    I am a ${my_gender}.
    We will now start the conversation. we will go one by one. First I will message, then you will message and so on.
    Do not send the whole conversation.
    I will begin first:
    ${first_message}`;
    return prompt;
}
