import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: 'html',
  use: {
    headless: false,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ["microphone","camera"],
        viewport: {
          width: 1280, 
          height: 720
        },
        launchOptions: {
          args: [
            "--disable-blink-features=AutomationControlled",
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
            "--use-file-for-fake-video-capture="+process.cwd()+"//resources//mjpeg//sample_640x360.mjpeg"
          ],
          
          ignoreDefaultArgs: [
            '--disable-component-extensions-with-background-pages'
        ],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     launchOptions: {
    //       args: [
    //         "--use-fake-device-for-media-stream",
    //         "--use-file-for-fake-video-capture="+process.cwd()+"//resources//mjpeg//sample_640x360.mjpeg",
    //         "--disable-dev-shm-usage",
    //         "--disable-blink-features=AutomationControlled",
    //       ],
    //     },
    //   },
    // },
  ],
  timeout: 90000
});
