import { MoodLogStoreSettings } from './MoodLogStoreSettings';

test('moodlogstoresettings have accessible defaults', () => {
  let settings = new MoodLogStoreSettings({test: {default: "beans"}});
  expect(settings.get("test")).toEqual("beans");
})

test('moodlogstoresettings can set values', () => {
  let settings = new MoodLogStoreSettings({test: {default: "beans"}});
  settings.set("test", "test2");
  expect(settings.get("test")).toEqual("test2");
})