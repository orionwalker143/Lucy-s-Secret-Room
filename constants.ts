import { Letter } from './types';

export const LETTERS: Record<string, Letter> = {
  LETTER_1: {
    id: 'LETTER_1',
    title: 'Letter #1',
    content: `Hey Lucy,\n\nThanks for being you, and for being here.\nYou make life a little funner.`,
    type: 'letter'
  },
  DOODLE: {
    id: 'DOODLE',
    title: 'Thanks <3',
    content: 'thanks for being there and laughing with me :)',
    type: 'doodle'
  },
  LETTER_2: {
    id: 'LETTER_2',
    title: 'Letter #2',
    content: `Sometimes I wish I could write on the window when you’re sad:\n"You’ll be okay. I’m here."\n\nSo… here it is.`,
    type: 'letter'
  },
  BOOK_BLUE: {
    id: 'BOOK_BLUE',
    title: 'Letter #3',
    content: `Remember that time how we useed to fight over k-pop idols?\n lol i think its funny now .`,
    type: 'letter'
  },
  BOOK_GREEN: {
    id: 'BOOK_GREEN',
    title: 'Affirmation',
    content: `You’re doing better than you think you are.`,
    type: 'affirmation'
  },
  BOOK_PURPLE: {
    id: 'BOOK_PURPLE',
    title: 'Photo Note',
    content: `i hope you like this room :)\n and listen to lots of BTS.`,
    type: 'note'
  },
  BOOK_PINK: {
    id: 'BOOK_PINK',
    title: 'Short Poem',
    content: `You deserve soft days,\nwarm light,\nand people who choose you every time.`,
    type: 'poem'
  },
  NOTICE_YELLOW: {
    id: 'NOTICE_YELLOW',
    title: 'Sticky Note',
    content: `You're brighter than you realise.`,
    type: 'note'
  },
  NOTICE_POLAROID: {
    id: 'NOTICE_POLAROID',
    title: 'Polaroid',
    content: `bts <3.`,
    type: 'note'
  },
  LETTER_4: {
    id: 'LETTER_4',
    title: 'Letter #4',
    content: `Thanks for being someone I can trust.\nThat means a lot to me.`,
    type: 'letter'
  },
  NOTICE_TICKET: {
    id: 'NOTICE_TICKET',
    title: 'Ticket Stub',
    content: `Thanks for carring .`,
    type: 'note'
  },
  NOTICE_ENVELOPE: {
    id: 'NOTICE_ENVELOPE',
    title: 'Message',
    content: `Open when you forget what you mean to people:\n\n"You matter more than you know."`,
    type: 'note'
  },
  LAMP_SHADOW: {
    id: 'LAMP_SHADOW',
    title: 'Shadow',
    content: `You light up my life.`,
    type: 'note'
  },
  PLANT_NOTE: {
    id: 'PLANT_NOTE',
    title: 'Small Note',
    content: `Look at you finding all the secrets :)`,
    type: 'note'
  },
  DRAWER_TOP: {
    id: 'DRAWER_TOP',
    title: 'Old Note',
    content: `You are a really nicd friend.`,
    type: 'note'
  },
  GIFT: {
    id: 'GIFT',
    title: 'Secret Gift',
    content: `Here’s something special:\n\nI hope this makes your day a bit brighter.\nYou deserve that.`,
    type: 'note'
  },
  DRAWER_BOTTOM: {
    id: 'DRAWER_BOTTOM',
    title: 'Tiny Hi',
    content: `Nothing in here…\nexcept this tiny ‘hi’ :)`,
    type: 'note'
  },
  LETTER_6: {
    id: 'LETTER_6',
    title: 'Letter #6',
    content: `If life had a soundtrack, you’d be one of the songs I never skip.`,
    type: 'letter'
  },
  FINAL_LETTER: {
    id: 'FINAL_LETTER',
    title: 'Final Letter',
    content: `Lucy,\n\nThank you for being part of my world.\nThank you for the jokes, the comfort, the memories, and for being someone I genuinely care about.\n\nI hope this room feels like a place you can return to whenever you need a moment of peace.\n\n— From Orion`,
    type: 'letter'
  }
};

export const TOTAL_LETTERS = 6; // Adjusted after removing Letter 5