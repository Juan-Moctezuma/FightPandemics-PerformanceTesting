import http from "k6/http";
import { check } from "k6";

let r, url, opts;

// Element skipped: jmeterTestPlan.hashTree.TestPlan.hashTree.ThreadGroup.hashTree.ResultCollector
// Element skipped: jmeterTestPlan.hashTree.TestPlan.hashTree.ThreadGroup.hashTree.ResultCollector
// Element skipped: jmeterTestPlan.hashTree.TestPlan.hashTree.ThreadGroup.hashTree.ResultCollector
// Element skipped: jmeterTestPlan.hashTree.TestPlan.hashTree.ThreadGroup.hashTree.ResultCollector

export let options = {
  stages: [
    {
      target: 50,
      duration: "10s",
    },
  ],
  noVUConnectionReuse: true,
};

export default function (data) {
  if (__VU >= 1 && __VU <= 50) {
    if (__ITER < 1) {
      url = "https://staging.fightpandemics.work/need-help";
      opts = {
        redirects: 999,
      };
      r = http.request("GET", url, "", opts);

      check(r, {
        "Response Assertion": (r) => {
          return r.status === 200;
        },
        "Duration Assertion": (r) => {
          return r.timings.duration <= 360;
        },
		"Size Assertion": (r) => {
		  return r.body.length == 3485;
      });

      url = "https://staging.fightpandemics.work/auth/login";
      opts = {
        redirects: 999,
      };
      r = http.request(
        "POST",
        url,
        {
          ["email"]: null,
          ["password"]: null,
        },
        opts
      );

      check(r, {
        "Response Assertion": (r) => {
          return r.status === 200;
        },
        "Duration Assertion": (r) => {
          return r.timings.duration <= 360;
        },
		"Size Assertion": (r) => {
		  return r.body.length == 3485;
      });
    }
  }
}