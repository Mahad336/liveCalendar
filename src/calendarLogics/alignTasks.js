const alignTasks = (renderedEvents) => {
  let time,
    time1,
    time2,
    stTime,
    edTime,
    stTime2,
    edTime2,
    maxDurationEvent,
    count,
    zIndex = 10,
    countStack;

  var greatestEvent, previousParent;

  for (let i = 0; i < renderedEvents.length; i++) {
    countStack = [];

    //renderedEvents[i].style.position = "relative";
    //renderedEvents[i].style.zIndex = zIndex;
    parseInt(renderedEvents[i].style.height) > 50
      ? (renderedEvents[i].childNodes[0].style.flexDirection = "column")
      : (renderedEvents[i].style.height = "49px");
    //zIndex++;

    stTime = renderedEvents[i]?.children[0].children[3].innerText;
    edTime = renderedEvents[i]?.children[0].children[4].innerText;
    stTime2 = renderedEvents[i - 1]?.children[0].children[3].innerText;
    edTime2 = renderedEvents[i - 1]?.children[0].children[4].innerText;
    if (stTime == stTime2) {
      //OR//
      renderedEvents[i - 1].appendChild(renderedEvents[i]);

      renderedEvents[i].style.marginLeft =
        renderedEvents[i].parentElement.childNodes.length * 50 + "px";

      if (!renderedEvents[i].children[0].children[3].innerText.includes(".")) {
        renderedEvents[i].style.marginTop =
          "-" +
          (renderedEvents[i].children[0].children[3].innerText -
            renderedEvents[i - 1].children[0].children[3].innerText) *
            100 +
          85.3 +
          "px";
      } else {
        renderedEvents[i].style.marginTop =
          (renderedEvents[i].children[0].children[4].innerText -
            renderedEvents[i].children[0].children[3].innerText * 3) *
            15 +
          "px";
      }
    } else {
      if (
        checkStartTimeInclude(
          renderedEvents,
          renderedEvents[i].children[0].children[3].innerText
        )
      ) {
        let parent = renderedEvents[i - 1];

        // checkStartTimeInclude(
        //   renderedEvents,
        //   renderedEvents[i].children[0].children[3].innerText
        // );

        renderedEvents[i].style.marginLeft = "80px";
        let parentSt = parent.children[0].children[3].innerText;
        let thisSt = renderedEvents[i].children[0].children[3].innerText;
        let dif = thisSt - parentSt;

        parent.appendChild(renderedEvents[i]);
        if (renderedEvents[i].children[0].children[3].innerText.includes(".")) {
          renderedEvents[i].style.marginTop = dif * 100 - 85 + "px";
        } else {
          renderedEvents[i].style.marginTop = dif * 100 - 85 + "px";
        }
      }
    }
    console.log(renderedEvents[i], renderedEvents[i].style.height);
  }
};

const checkStartTimeInclude = (renderedEventss, currEventStartTime) => {
  let allEventsIncludingCurrStTime = [];
  for (let i = 0; i < renderedEventss.length; i++) {
    let st = renderedEventss[i].children[0].children[3].innerText;
    let et = renderedEventss[i].children[0].children[4].innerText;

    if (currEventStartTime > st && currEventStartTime < et) {
      allEventsIncludingCurrStTime.push(renderedEventss[i]);
    }
  }

  let smallestDurationEventTime, smallestDurationEvent;

  for (let i = 0; i < allEventsIncludingCurrStTime.length; i++) {
    let st = allEventsIncludingCurrStTime[i].children[0].children[3].innerText;
    let et = allEventsIncludingCurrStTime[i].children[0].children[4].innerText;

    smallestDurationEventTime =
      allEventsIncludingCurrStTime[0].children[0].children[4].innerText -
      allEventsIncludingCurrStTime[0].children[0].children[3].innerText;
    smallestDurationEvent = allEventsIncludingCurrStTime[0];

    if (et - st < smallestDurationEventTime) {
      smallestDurationEventTime = et - st;
      smallestDurationEvent = allEventsIncludingCurrStTime[i];
    }
  }
  return smallestDurationEvent;
};

export { alignTasks };
