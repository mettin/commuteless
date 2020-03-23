import React, { useState } from "react";
import "./styles.css";

const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const WEEKS_IN_A_YEAR = 52;

const MS_IN_A_SECOND = 1000;
const MS_IN_A_MINUTE = MS_IN_A_SECOND * SECONDS_IN_A_MINUTE;
const MS_IN_A_HOUR = MS_IN_A_MINUTE * MINUTES_IN_AN_HOUR;

const numberEnding = number => (Math.floor(number) !== 1 ? "s" : "");

const round = n => Math.round(n * 10) / 10;

function millisecondsToStr(min, workingHours, forceMinutes) {
  const milliseconds = min * SECONDS_IN_A_MINUTE * MS_IN_A_SECOND;

  var temp = Math.floor(milliseconds / 1000);

  var hours = milliseconds / MS_IN_A_HOUR;
  var minutes = (temp %= 3600) / 60;
  var seconds = temp % 60;

  if (forceMinutes) {
    return `${round(min)} minute${numberEnding(min)}`;
  }
  if (hours >= 1) {
    if (hours > workingHours) {
      return `${round(hours / workingHours)} business day${numberEnding(
        hours
      )}`;
    }
    return round(hours) + " hour" + numberEnding(hours);
  }
  if (minutes >= 1) {
    return round(minutes) + " minute" + numberEnding(minutes);
  }
  if (seconds) {
    return round(seconds) + " second" + numberEnding(seconds);
  }
  return "?";
}

export default function App() {
  const [workingHours, setWorkingHours] = useState(8);
  const [travelTime, setTravelTime] = useState(30);
  const [workingDays, setWorkingDays] = useState(5);
  const [vacationDays, setVacationDays] = useState(25);

  const dailyTravelTime = travelTime * 2;
  const totalMinutes = dailyTravelTime * workingDays * 47;
  const shareText = `Because i'm working remote i'm saving ${millisecondsToStr(
    dailyTravelTime * workingDays,
    workingHours,
    true
  )} of commute time per month`;

  return (
    <div className="App">
      <h1>Commuteless: How much time do you save by working&nbsp;remote?</h1>
      <main>
        <div className="sizer main-content">
          <form>
            <h2>Tell me about your day</h2>
            <div className="card">
              <div className="input-group">
                <label htmlFor="working-hours">
                  <span role="img" aria-label="stopwatch icon">
                    ⏱
                  </span>{" "}
                  <span>Working hours in a day:</span>
                </label>
                <input
                  id="working-hours"
                  min="1"
                  max="24"
                  type="range"
                  value={workingHours}
                  onChange={e => setWorkingHours(e.target.value)}
                />
                <span className="value">{workingHours}</span>
              </div>

              <div className="input-group">
                <label htmlFor="working-days">
                  <span role="img" aria-label="calendar icon">
                    📆
                  </span>{" "}
                  <span>Working days per week:</span>
                </label>
                <input
                  id="working-days"
                  min="1"
                  max="7"
                  type="range"
                  value={workingDays}
                  onChange={e => setWorkingDays(e.target.value)}
                />
                <span className="value">{workingDays}</span>
              </div>

              <div className="input-group">
                <label htmlFor="travel-time">
                  <span role="img" aria-label="car icon">
                    🚗
                  </span>{" "}
                  <span>One way door to door travel time in minutes:</span>
                </label>
                <input
                  id="travel-time"
                  min="1"
                  max="180"
                  type="range"
                  value={travelTime}
                  onChange={e => setTravelTime(e.target.value)}
                />
                <span className="value">{travelTime}</span>
              </div>

              <div className="input-group">
                <label htmlFor="vacation-days">
                  <span role="img" aria-label="beach icon">
                    🏖
                  </span>{" "}
                  <span>Annual vacation days:</span>
                </label>
                <input
                  id="vacation-days"
                  min="0"
                  max="99"
                  type="range"
                  value={vacationDays}
                  onChange={e => setVacationDays(e.target.value)}
                />
                <span className="value">{vacationDays}</span>
              </div>
            </div>
          </form>

          <div className="blocks">
            <h2>
              Remote work will save you{" "}
              {millisecondsToStr(
                dailyTravelTime *
                  workingDays *
                  (WEEKS_IN_A_YEAR - vacationDays / workingDays),
                workingHours,
                true
              )}
            </h2>
            <div className="block card">
              <h3>Weekly:</h3>
              <dl>
                <dt>
                  {dailyTravelTime} minutes ⨉ {workingDays} days =
                </dt>
                <dd>
                  {millisecondsToStr(
                    dailyTravelTime * workingDays,
                    workingHours
                  )}{" "}
                  a week
                </dd>
              </dl>
            </div>
            <div className="block card">
              <h3>
                <span className="main">Monthly:</span>{" "}
                <span className="help">
                  {round(4.3 * workingDays)} business days
                </span>
              </h3>
              <dl>
                <dt>
                  {dailyTravelTime} minutes ⨉ {round(4.3 * workingDays)}{" "}
                  business days =
                </dt>
                <dd>
                  {millisecondsToStr(
                    dailyTravelTime * (4.3 * workingDays),
                    workingHours
                  )}{" "}
                  a month
                </dd>
              </dl>
            </div>
            <div className="block card">
              <h3>
                <span className="main">Annually:</span>{" "}
              </h3>
              <dl>
                <dt>
                  {dailyTravelTime} minutes ⨉ {round(workingDays * 4.3)}{" "}
                  business ⨉ {Math.round(52 - vacationDays / workingDays)} weeks
                  =
                </dt>
                <dd>
                  {millisecondsToStr(
                    dailyTravelTime *
                      workingDays *
                      (WEEKS_IN_A_YEAR - vacationDays / workingDays),
                    workingHours
                  )}{" "}
                  a year
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <div className="conclusion">
        <div className="sizer">
          <h2>In this time, annually you can:</h2>
          <div className="card">
            <dl>
              <dt>Wash and dry your hands (2 minutes)</dt>
              <dd>
                {Math.floor(totalMinutes / 2)} time
                {numberEnding(Math.floor(totalMinutes / 2))}
              </dd>
              <dt>Play Monopoly (90 min)</dt>
              <dd>
                {Math.floor(totalMinutes / 90)} game
                {numberEnding(Math.floor(totalMinutes / 90))}
              </dd>
              <dt>Make a lasagne (45 min)</dt>
              <dd>
                {Math.floor(totalMinutes / 60)} lasagne
                {numberEnding(Math.floor(totalMinutes / 60))}
              </dd>
              <dt>Water your plants (10 min)</dt>
              <dd>
                {Math.floor(totalMinutes / 10)} times{" "}
                {totalMinutes > 1040 &&
                  "(please don't do this, they will probably drown)"}
              </dd>
              <dt>Make this site (15 hours)</dt>
              <dd>{Math.floor(totalMinutes / 900)} times</dd>
              <dt>Play Mario Kart 8 Deluxe (1 minute, 10 seconds per lap) </dt>
              <dd>±{Math.floor(totalMinutes / 1.15)} laps</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="conclusion">
        <div className="sizer">
          <h2>Share your times:</h2>
          <div className="card">
            <p className="share-preview">
              <em>Preview:</em> {shareText}
            </p>
            <a
              href={`https://twitter.com/share?text=${encodeURI(
                shareText
              )}&url=${encodeURI(
                "https://commuteless.app"
              )}&hashtags=commuteless&related=mettinparzinski`}
              class="twitter-share-button"
              data-show-count="true"
            >
              Tweet
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            />
          </div>
        </div>
      </div>
      <footer>
        <div className="sizer">
          <p>
            Made in social isolation by{" "}
            <a href="https://twitter.com/mettinparzinski">Mettin Parzinski</a>.
            Stay safe.
          </p>
        </div>
      </footer>
    </div>
  );
}
