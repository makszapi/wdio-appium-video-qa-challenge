# Video QA Challenge — Android UI Automation

Automated UI tests for the **Video QA Challenge** Android application, built with
**Appium**, **WebdriverIO**, and **TypeScript**.

The suite exercises the consent flow, content navigation, video details, playback controls,
and playback-position persistence. It runs against the Android APK as a black-box test suite
and produces console, Allure, and JUnit reports.

## Test coverage

| Area | Scenario | Spec |
|---|---|---|
| Consent | Accept consent and continue to the content overview | `videoapp-consent.spec.ts` |
| Consent | Reject consent and continue to the content overview | `videoapp-consent.spec.ts` |
| Consent | Change and save analytics and personalisation preferences | `videoapp-consent.spec.ts` |
| Consent | Preserve the consent decision after relaunching the app | `videoapp-consent.spec.ts` |
| Video details | Display the expected title, category, and description | `videoapp-video-details-play-and-pause.spec.ts` |
| Navigation | Return from video details to the content overview | `videoapp-video-details-play-and-pause.spec.ts` |
| Playback | Transition through buffering and playing, then pause at a non-zero position | `videoapp-video-details-play-and-pause.spec.ts` |
| Playback | Restore and continue playback after navigating away and reopening the video | `videoapp-video-progress-after-navigating-back.spec.ts` |

## Project structure

```text
config/
  constants.ts                       Environment overrides and shared timeouts
  wdio-shared.conf.ts                Framework, runner, and reporter configuration
  wdio-shared-local-appium.conf.ts   Local Appium service configuration
  wdio-android-videoapp.conf.ts      Android capabilities and spec selection
tests/
  data/                              Expected content and player states
  screens/                           Screen and reusable component objects
  specs/                             Test scenarios
  utils/                             App lifecycle, navigation, and locator helpers
```

The configuration is layered from shared runner settings through local Appium settings to the
Android capabilities. Screen objects contain selectors and interactions, while assertions remain
in the specs. All selectors are constructed through `LocatorStrategy` using application test IDs.

## Prerequisites

- Node.js 22 or newer
- npm
- A Java runtime suitable for the Android SDK and Allure
- Android SDK and platform tools, with `adb` and `emulator` available on `PATH`
- An Android Virtual Device; the default configuration expects `Pixel_8_2` on Android 15.0
- The `VideoQAChallenge-debug.apk` application binary

The APK is not committed to this repository. Obtain it from the `bin/` directory of the
[Video QA Challenge Android repository](https://github.com/tchumakina/video-qa-challenge-android)
and place it at:

```text
apps/VideoQAChallenge-debug.apk
```

Appium, its UiAutomator2 driver, and the Appium service are installed as project dependencies;
a global Appium installation is not required.

## Installation

```bash
npm ci
```

Confirm that the configured emulator exists:

```bash
emulator -list-avds
```

You can start it yourself:

```bash
emulator -avd Pixel_8_2
```

If it is not already running, Appium can launch the AVD configured by `ANDROID_AVD` when the
test session starts.

## Running the tests

Run the complete Android suite:

```bash
npm test
```

Run a single scenario by matching its Mocha title:

```bash
npx wdio run config/wdio-android-videoapp.conf.ts \
  --mochaOpts.grep "play and pause"
```

Other available commands:

| Command | Purpose |
|---|---|
| `npm run android:app` | Run the complete Android suite directly |
| `npm run test:report` | Run the suite, generate an Allure report, and open it |
| `npm run report:generate` | Generate an Allure report from the latest results |
| `npm run report:open` | Open the generated Allure report |
| `npm run lint` | Check the source with ESLint |
| `npm run lint:fix` | Apply ESLint fixes |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run appium:inspector` | Start Appium with the Inspector plugin |

## Configuration

Machine-specific settings can be overridden through environment variables without editing the
configuration files.

| Variable | Default | Purpose |
|---|---|---|
| `ANDROID_AVD` | `Pixel_8_2` | Android Virtual Device to use |
| `ANDROID_PLATFORM_VERSION` | `15.0` | Android version expected by the capability |
| `ANDROID_APK_PATH` | `./apps/VideoQAChallenge-debug.apk` | Path to the application binary |
| `ANDROID_LAUNCH_ARGS` | `--ez resetAllState true --ei contentDelayMs 500 --ei videoBufferingMs 1500` | App state reset and deterministic test delays |
| `WDIO_LOG_LEVEL` | `info` | WebdriverIO logging level |
| `LOG_DIR` | `./logs` | Appium log directory |
| `TEST_REPORT_DIR` | `./test_reports` | Allure and JUnit output directory |

For example, to use an Android 14 emulator:

```bash
ANDROID_AVD=Pixel_7_API_34 \
ANDROID_PLATFORM_VERSION=14.0 \
npm test
```

## Reliability and test isolation

- **Deterministic startup:** each session uses the application's `resetAllState` launch option
  and fixed content-loading and video-buffering delays.
- **Independent consent tests:** the app is activated before each first-launch scenario, then
  terminated and cleared afterward.
- **Condition-based synchronization:** tests use WebdriverIO matchers and `waitUntil`; the suite
  contains no fixed `pause` calls.
- **Stable selectors:** elements are addressed through application test IDs rather than XPath or
  screen coordinates.
- **Centralized timeouts:** navigation, visibility, selector, and playback waits are declared in
  `config/constants.ts`.
- **Single-device execution:** `wdio:maxInstances` is set to `1` for the Android capability.

## Reports and diagnostics

Each run writes:

- human-readable progress to the terminal;
- Allure results to `test_reports/allure-results`;
- JUnit XML to `test_reports/junit`;
- Appium server logs to `logs/appium.log`.

When a test fails, WebdriverIO captures a screenshot and Allure attaches it to the test result.
To generate and open the Allure report after a run:

```bash
npm run report:generate
npm run report:open
```

## Known limitations

- Only Android emulator execution is configured; there is no iOS, real-device, or cloud-device
  configuration.
- Loading, empty-content, and error states are not currently covered.
- Content items are collected by resourceId prefix and then matched by visible title. This assumes
  the target item is among the currently rendered list entries.
- No CI workflow is included; the suite currently runs locally.

## License

This project is available under the [MIT License](LICENSE).
