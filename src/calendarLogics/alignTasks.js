import { convertTime } from "./convertTime";
import { listenForOverlap } from "element-overlap";

const alignTasks = (renderedEvents) => {
  let time, time1, time2;

  for (let i = 0; i < renderedEvents.length; i++) {
    for (let j = i + 1; j < renderedEvents.length; j++) {
      listenForOverlap(renderedEvents[i], renderedEvents[j], () => {
        console.log("Overlapped", renderedEvents[i], renderedEvents[j]);
        time1 =
          renderedEvents[i].parentElement.children[0].children[0].innerText;
        time2 = renderedEvents[j].children[0].innerText;
        time = convertTime(time1, time2);

        document
          .getElementById(renderedEvents[i].parentElement.id)
          .appendChild(renderedEvents[j]);
        renderedEvents[j].style.marginTop =
          (time[1] - time[0]) * 100 - 9 + "px";
      });
    }
  }
};

export { alignTasks };
