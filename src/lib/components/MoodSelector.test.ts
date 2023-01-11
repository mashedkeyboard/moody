import MoodSelector from '$lib/components/MoodSelector.svelte';
import type { Mood } from '$lib/models/Mood';
import { moods } from '$lib/MoodLibrary';
import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'

describe('MoodSelector.svelte', () => {
  // TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(MoodSelector, {})
    expect(container).toBeTruthy()
    expect(container.innerHTML).toContain('😭')
    expect(container.innerHTML).toMatchSnapshot()
  })

  moods.forEach(function(mood) {
    it(`dispatches an event when ${mood.icon} is selected`, async () => {
      const { component } = render(MoodSelector, {})
      const btn = screen.getByText(mood.icon);

      let moodSelected : Mood;
      const moodSelectedEvent = vi.fn((event) => moodSelected = event.detail);

      component.$on("moodSelect", moodSelectedEvent);
      await fireEvent.click(btn);

      expect(moodSelectedEvent).toHaveBeenCalled();
      expect(moodSelected).toBe(mood);
    })
  })
})
