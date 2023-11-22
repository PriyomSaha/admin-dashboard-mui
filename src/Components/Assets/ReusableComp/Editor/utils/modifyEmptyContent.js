let EMPTY_CONTENT = null;

export const modifyEvent = (eventDescription) => {
  const EMPTY_EVENT_CONTENT =
    '{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"#value#","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
  EMPTY_CONTENT = EMPTY_EVENT_CONTENT.replace("#value#", eventDescription);
  return EMPTY_CONTENT;
};

// Order has been placed.
