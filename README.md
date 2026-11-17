<p align="center"><img src="assets/logo.png" width="120" alt="Tab Renamer logo"></p>

# Tab Renamer

Rename any Chrome tab. Press **Option+R** (Mac) or **Alt+Shift+R** (Windows/Linux), type a name, hit Enter.
The name sticks when you reload that page.

Chrome has no built-in way to rename a tab. This is a tiny extension that adds one.

## Install (free, about 30 seconds)

This isn't on the Chrome Web Store yet, so you load it yourself:

1. Click the green **Code** button on this page, then **Download ZIP**, and unzip it.
2. In Chrome, open `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and choose the unzipped `tab-renamer` folder.
5. Optional: click the puzzle-piece icon and pin **Tab Renamer** to your toolbar.

## Use it

- Click into a page and press **Option+R** (Mac) or **Alt+Shift+R** (Windows/Linux). You can also click the toolbar button.
- Type a name and press **Enter**. **Esc** cancels.
- Leave the name empty and press Enter to put the site's original title back.

If the shortcut doesn't work, open `chrome://extensions/shortcuts` and set one for "Rename this tab".
On Mac, if Chrome refuses Option+R, use Control+R there instead.

## What it does and doesn't do

- Names are saved **per page address** (without the `#` part) and re-applied when you reload.
- It keeps your name even if the site rewrites its own title.
- It can't rename `chrome://` pages, the Chrome Web Store or Chrome's PDF viewer. Chrome blocks extensions there.

## Privacy

Everything stays in your browser. Names are saved in Chrome's local extension storage on your computer.
Nothing is sent anywhere, and there is no analytics, tracking or network code. The whole thing is three small files you can read:
`manifest.json`, `background.js`, `content.js`.

Chrome will warn that it can "read and change all your data on all websites". That's because the extension runs on every page so it can re-apply your tab names after a reload. It only touches the page title.

## License

MIT, see [LICENSE](LICENSE).
