import { flavors } from "@catppuccin/palette";

import type {
  CatppuccinPaletteAnsi,
  CatppuccinFlavor,
  CatppuccinPalette,
  ThemeContext,
  ThemeOptions,
} from "@/types";

// Custom dark flavor color overrides based on Neovim/Ghostty/tmux palette
// base = editor background, mantle = surface, crust = deeper surface
const darkColorOverrides = {
  base: "#1A1A1A", // Editor background
  mantle: "#181818", // Surface (sidebar/panels/tabs)
  crust: "#181818", // Deeper surface (status bar/title bar)
};

// Custom dark flavor UI color overrides matching Neovim/Ghostty/tmux palette
// Target palette:
// - editor background: #101012
// - UI background (sidebar/panels/tabs): #181818
// - deeper surface (status bar/title bar): #141414
// - borders/separators: #3b3b3b
// - default fg: #cdd6f4
// - muted fg: #585b70 (or #45475b)
// - primary accent (blue): #8AB5FA (focus/active states, folders, tab indicator)
// - secondary highlight: #f9e2af
// - selection bg: #353749 (with opacity variants)
const darkUIColorOverrides = {
  // ============================================
  // EDITOR
  // ============================================
  "editor.background": "#1A1A1A",
  "editor.foreground": "#cdd6f4",
  "editor.lineHighlightBackground": "#212121",
  "editor.lineHighlightBorder": "#00000000",
  "editor.selectionBackground": "#35374999", // Selection with opacity
  "editor.inactiveSelectionBackground": "#35374966", // Dimmer selection
  "editor.selectionHighlightBackground": "#35374966",
  "editor.wordHighlightBackground": "#35374966",
  "editor.wordHighlightStrongBackground": "#35374980",
  "editor.findMatchBackground": "#35374999",
  "editor.findMatchBorder": "#8AB5FA66",
  "editor.findMatchHighlightBackground": "#35374966",
  "editor.findMatchHighlightBorder": "#00000000",
  "editor.findRangeHighlightBackground": "#35374933",
  "editor.hoverHighlightBackground": "#35374966",
  "editor.rangeHighlightBackground": "#35374966",
  "editorCursor.foreground": "#cdd6f4",

  // Editor gutter/line numbers
  "editorGutter.background": "#1A1A1A",
  "editorLineNumber.foreground": "#585b70",
  "editorLineNumber.activeForeground": "#cdd6f4",

  // Editor widgets
  "editorWidget.background": "#181818",
  "editorWidget.foreground": "#cdd6f4",
  "editorWidget.border": "#3b3b3b",
  "editorHoverWidget.background": "#181818",
  "editorHoverWidget.border": "#3b3b3b",
  "editorSuggestWidget.background": "#181818",
  "editorSuggestWidget.border": "#3b3b3b",
  "editorSuggestWidget.foreground": "#cdd6f4",
  "editorSuggestWidget.selectedBackground": "#353749",
  "editorSuggestWidget.selectedForeground": "#cdd6f4",
  "editorSuggestWidget.highlightForeground": "#8AB5FA",
  "editorStickyScrollHover.background": "#212121",

  // Editor groups and borders
  "editorGroup.border": "#3b3b3b",
  "editorGroup.dropBackground": "#35374966",
  "editorGroupHeader.tabsBackground": "#181818",
  "editorGroupHeader.tabsBorder": "#3b3b3b",
  "editorGroupHeader.border": "#3b3b3b",

  // Indent guides
  "editorIndentGuide.background": "#3b3b3b66",
  "editorIndentGuide.activeBackground": "#3b3b3b",

  // Bracket matching
  "editorBracketMatch.background": "#35374966",
  "editorBracketMatch.border": "#8AB5FA66",

  // ============================================
  // TABS
  // ============================================
  "tab.activeBackground": "#181818",
  "tab.inactiveBackground": "#181818",
  "tab.activeForeground": "#cdd6f4",
  "tab.inactiveForeground": "#585b70",
  "tab.border": "#3b3b3b",
  "tab.activeBorder": "#00000000",
  "tab.activeBorderTop": "#8AB5FA", // Blue indicator for active tab (matches nvim)
  "tab.unfocusedActiveBorderTop": "#8AB5FA66",
  "tab.hoverBackground": "#21212180",
  "tab.hoverForeground": "#cdd6f4",
  "tab.unfocusedActiveBackground": "#181818",
  "tab.unfocusedInactiveBackground": "#181818",
  "tab.unfocusedActiveForeground": "#cdd6f4",
  "tab.unfocusedInactiveForeground": "#585b70",
  "tab.lastPinnedBorder": "#3b3b3b",
  "tab.activeModifiedBorder": "#f9e2af",
  "tab.inactiveModifiedBorder": "#f9e2af66",

  // ============================================
  // EXPLORER / SIDEBAR
  // ============================================
  "sideBar.background": "#181818",
  "sideBar.foreground": "#cdd6f4",
  "sideBar.border": "#3b3b3b",
  "sideBar.dropBackground": "#35374966",
  "sideBarTitle.foreground": "#cdd6f4",
  "sideBarSectionHeader.background": "#181818",
  "sideBarSectionHeader.foreground": "#cdd6f4",
  "sideBarSectionHeader.border": "#3b3b3b",

  // List/tree (explorer, search results, etc.)
  "list.activeSelectionBackground": "#353749",
  "list.activeSelectionForeground": "#cdd6f4",
  "list.activeSelectionIconForeground": "#cdd6f4",
  "list.inactiveSelectionBackground": "#35374966",
  "list.inactiveSelectionForeground": "#cdd6f4",
  "list.inactiveSelectionIconForeground": "#cdd6f4",
  "list.hoverBackground": "#21212180",
  "list.hoverForeground": "#cdd6f4",
  "list.focusBackground": "#353749",
  "list.focusForeground": "#cdd6f4",
  "list.focusOutline": "#8AB5FA",
  "list.focusHighlightForeground": "#8AB5FA",
  "list.highlightForeground": "#8AB5FA",
  "list.dropBackground": "#35374966",
  "list.warningForeground": "#f9e2af",

  // Tree indent guides
  "tree.indentGuidesStroke": "#3b3b3b",
  "tree.inactiveIndentGuidesStroke": "#3b3b3b66",
  "tree.tableColumnsBorder": "#3b3b3b",
  "tree.tableOddRowsBackground": "#21212180",

  // Icon colors
  "icon.foreground": "#cdd6f4",

  // ============================================
  // STATUS BAR / TITLE BAR
  // ============================================
  "statusBar.background": "#181818",
  "statusBar.foreground": "#585b70",
  "statusBar.border": "#3b3b3b",
  "statusBar.noFolderBackground": "#181818",
  "statusBar.noFolderForeground": "#585b70",
  "statusBar.noFolderBorder": "#3b3b3b",
  "statusBar.debuggingBackground": "#f38ba8",
  "statusBar.debuggingForeground": "#181818",
  "statusBarItem.activeBackground": "#35374966",
  "statusBarItem.hoverBackground": "#35374966",
  "statusBarItem.prominentForeground": "#8AB5FA",
  "statusBarItem.prominentBackground": "#00000000",
  "statusBarItem.prominentHoverBackground": "#35374966",
  "statusBarItem.remoteBackground": "#8AB5FA",
  "statusBarItem.remoteForeground": "#181818",

  "titleBar.activeBackground": "#181818",
  "titleBar.activeForeground": "#cdd6f4",
  "titleBar.inactiveBackground": "#181818",
  "titleBar.inactiveForeground": "#585b70",
  "titleBar.border": "#3b3b3b",

  // ============================================
  // ACTIVITY BAR
  // ============================================
  "activityBar.background": "#181818",
  "activityBar.foreground": "#8AB5FA",
  "activityBar.inactiveForeground": "#585b70",
  "activityBar.border": "#3b3b3b",
  "activityBar.activeBorder": "#8AB5FA",
  "activityBar.activeBackground": "#00000000",
  "activityBarBadge.background": "#8AB5FA",
  "activityBarBadge.foreground": "#181818",
  "activityBarTop.foreground": "#8AB5FA",
  "activityBarTop.inactiveForeground": "#585b70",
  "activityBarTop.activeBorder": "#8AB5FA",

  // ============================================
  // PANELS / TERMINAL
  // ============================================
  "panel.background": "#181818",
  "panel.border": "#3b3b3b",
  "panel.dropBorder": "#8AB5FA",
  "panelTitle.activeForeground": "#cdd6f4",
  "panelTitle.inactiveForeground": "#585b70",
  "panelTitle.activeBorder": "#8AB5FA",
  "panelSection.border": "#3b3b3b",
  "panelSection.dropBackground": "#35374966",
  "panelSectionHeader.background": "#181818",
  "panelSectionHeader.foreground": "#cdd6f4",
  "panelSectionHeader.border": "#3b3b3b",

  "terminal.background": "#181818",
  "terminal.foreground": "#cdd6f4",
  "terminal.border": "#3b3b3b",
  "terminal.selectionBackground": "#353749",
  "terminal.inactiveSelectionBackground": "#35374966",
  "terminalCursor.background": "#181818",
  "terminalCursor.foreground": "#cdd6f4",

  // ============================================
  // INPUTS / DROPDOWNS / WIDGETS
  // ============================================
  "input.background": "#181818",
  "input.foreground": "#cdd6f4",
  "input.border": "#3b3b3b",
  "input.placeholderForeground": "#585b70",
  "inputOption.activeBackground": "#353749",
  "inputOption.activeBorder": "#8AB5FA",
  "inputOption.activeForeground": "#cdd6f4",

  "dropdown.background": "#181818",
  "dropdown.foreground": "#cdd6f4",
  "dropdown.border": "#3b3b3b",
  "dropdown.listBackground": "#181818",

  "quickInput.background": "#181818",
  "quickInput.foreground": "#cdd6f4",
  "quickInputList.focusBackground": "#353749",
  "quickInputList.focusForeground": "#cdd6f4",
  "quickInputList.focusIconForeground": "#8AB5FA",
  "quickInputTitle.background": "#181818",

  "editorMarkerNavigation.background": "#181818",

  // ============================================
  // NOTIFICATIONS / POPUPS
  // ============================================
  "notifications.background": "#181818",
  "notifications.foreground": "#cdd6f4",
  "notifications.border": "#3b3b3b",
  "notificationCenter.border": "#3b3b3b",
  "notificationCenterHeader.background": "#181818",
  "notificationCenterHeader.foreground": "#cdd6f4",
  "notificationToast.border": "#3b3b3b",
  "notificationLink.foreground": "#8AB5FA",

  // ============================================
  // FOCUS / ACCENT (blue #8AB5FA for active states)
  // ============================================
  focusBorder: "#8AB5FA",
  "selection.background": "#35374999",

  // Buttons
  "button.background": "#8AB5FA",
  "button.foreground": "#181818",
  "button.hoverBackground": "#9AC5FF",
  "button.secondaryBackground": "#353749",
  "button.secondaryForeground": "#cdd6f4",
  "button.secondaryHoverBackground": "#454959",

  // Badges
  "badge.background": "#353749",
  "badge.foreground": "#cdd6f4",

  // Checkboxes
  "checkbox.background": "#181818",
  "checkbox.foreground": "#8AB5FA",
  "checkbox.border": "#3b3b3b",

  // Progress bar
  "progressBar.background": "#8AB5FA",

  // ============================================
  // BREADCRUMBS / LINKS
  // ============================================
  "breadcrumb.background": "#181818",
  "breadcrumb.foreground": "#585b70",
  "breadcrumb.focusForeground": "#8AB5FA",
  "breadcrumb.activeSelectionForeground": "#8AB5FA",
  "breadcrumbPicker.background": "#181818",

  "textLink.foreground": "#8AB5FA",
  "textLink.activeForeground": "#9AC5FF",
  "textSeparator.foreground": "#3b3b3b",

  // ============================================
  // SEARCH / FIND
  // ============================================
  "searchEditor.findMatchBackground": "#35374966",
  "searchEditor.findMatchBorder": "#8AB5FA66",
  "searchEditor.textInputBorder": "#3b3b3b",
  "search.resultsInfoForeground": "#cdd6f4",

  // ============================================
  // PICKER / COMMAND PALETTE
  // ============================================
  "pickerGroup.foreground": "#8AB5FA",
  "pickerGroup.border": "#3b3b3b",

  // ============================================
  // MENU
  // ============================================
  "menu.background": "#181818",
  "menu.foreground": "#cdd6f4",
  "menu.border": "#3b3b3b",
  "menu.selectionBackground": "#353749",
  "menu.selectionForeground": "#cdd6f4",
  "menu.separatorBackground": "#3b3b3b",
  "menubar.selectionBackground": "#353749",
  "menubar.selectionForeground": "#cdd6f4",

  // ============================================
  // SETTINGS
  // ============================================
  "settings.headerForeground": "#cdd6f4",
  "settings.modifiedItemIndicator": "#8AB5FA",
  "settings.focusedRowBackground": "#35374966",
  "settings.dropdownBackground": "#181818",
  "settings.dropdownBorder": "#3b3b3b",
  "settings.textInputBackground": "#181818",
  "settings.textInputBorder": "#3b3b3b",
  "settings.numberInputBackground": "#181818",
  "settings.numberInputBorder": "#3b3b3b",

  // ============================================
  // PEEK VIEW
  // ============================================
  "peekView.border": "#8AB5FA",
  "peekViewEditor.background": "#181818",
  "peekViewEditorGutter.background": "#181818",
  "peekViewEditor.matchHighlightBackground": "#35374966",
  "peekViewEditor.matchHighlightBorder": "#8AB5FA66",
  "peekViewResult.background": "#181818",
  "peekViewResult.fileForeground": "#cdd6f4",
  "peekViewResult.lineForeground": "#cdd6f4",
  "peekViewResult.matchHighlightBackground": "#35374966",
  "peekViewResult.selectionBackground": "#353749",
  "peekViewResult.selectionForeground": "#cdd6f4",
  "peekViewTitle.background": "#181818",
  "peekViewTitleLabel.foreground": "#cdd6f4",
  "peekViewTitleDescription.foreground": "#585b70",

  // ============================================
  // SCROLLBAR / MINIMAP
  // ============================================
  "scrollbar.shadow": "#00000066",
  "scrollbarSlider.background": "#3b3b3b66",
  "scrollbarSlider.hoverBackground": "#3b3b3b99",
  "scrollbarSlider.activeBackground": "#3b3b3bcc",

  "minimap.background": "#181818",
  "minimap.selectionHighlight": "#35374999",
  "minimap.findMatchHighlight": "#8AB5FA66",
  "minimapSlider.background": "#3b3b3b33",
  "minimapSlider.hoverBackground": "#3b3b3b66",
  "minimapSlider.activeBackground": "#3b3b3b99",

  // ============================================
  // WELCOME / WALKTHROUGH
  // ============================================
  "welcomePage.background": "#181818",
  "welcomePage.tileBackground": "#212121",
  "welcomePage.progress.background": "#181818",
  "welcomePage.progress.foreground": "#8AB5FA",
  "walkThrough.embeddedEditorBackground": "#181818",

  // ============================================
  // COMMAND CENTER
  // ============================================
  "commandCenter.background": "#181818",
  "commandCenter.foreground": "#cdd6f4",
  "commandCenter.inactiveForeground": "#585b70",
  "commandCenter.activeForeground": "#8AB5FA",
  "commandCenter.activeBackground": "#353749",
  "commandCenter.border": "#3b3b3b",
  "commandCenter.inactiveBorder": "#3b3b3b",
  "commandCenter.activeBorder": "#8AB5FA",

  // ============================================
  // DEBUG TOOLBAR
  // ============================================
  "debugToolBar.background": "#181818",
  "debugToolBar.border": "#3b3b3b",

  // ============================================
  // CHAT / INTERACTIVE
  // ============================================
  "chat.slashCommandBackground": "#181818",
  "chat.avatarBackground": "#181818",
  "interactive.activeCodeBorder": "#8AB5FA",
  "interactive.inactiveCodeBorder": "#3b3b3b",

  // ============================================
  // TABLE / MISC
  // ============================================
  "table.headerBackground": "#181818",
  "table.headerForeground": "#cdd6f4",

  // Sash (panel resize)
  "sash.hoverBorder": "#8AB5FA",

  // GitLens
  "gitlens.gutterBackgroundColor": "#1818184d",

  // Symbol icons - folders should be blue like nvim
  "symbolIcon.folderForeground": "#8AB5FA",
  "symbolIcon.fileForeground": "#cdd6f4",
};
import { getTokenColors } from "./tokenColors";
import { getSemanticTokens } from "./semanticTokens";
import { getUiColors } from "./uiColors";

export const defaultOptions: ThemeOptions = {
  accent: "mauve",
  boldKeywords: true,
  italicComments: true,
  italicKeywords: true,
  colorOverrides: {},
  workbenchMode: "default",
  bracketMode: "rainbow",
  extraBordersEnabled: false,
  customUIColors: {},
  syncWithIconPack: true,
};

export const compileTheme = (
  flavor: CatppuccinFlavor | "dark" = "mocha",
  options: ThemeOptions = defaultOptions,
) => {
  // Handle custom "dark" flavor as mocha with overrides
  const baseFlavor = flavor === "dark" ? "mocha" : (flavor as CatppuccinFlavor);
  const flavorData = flavors[baseFlavor];
  const ctpPalette = {} as CatppuccinPalette;
  const paletteAnsi = {
    normal: {},
    bright: {},
  } as CatppuccinPaletteAnsi;

  for (const [k, v] of flavorData.colorEntries) {
    ctpPalette[k] = v.hex;
  }
  for (const [k, v] of flavorData.ansiColorEntries) {
    paletteAnsi.normal[k] = v.normal.hex;
    paletteAnsi.bright[k] = v.bright.hex;
  }

  const palette: CatppuccinPalette = {
    ...ctpPalette,
    // Apply dark overrides if dark flavor
    ...(flavor === "dark" ? darkColorOverrides : {}),
    ...options.colorOverrides?.all,
    ...options.colorOverrides?.[baseFlavor],
  };

  const context: ThemeContext = {
    flavor: baseFlavor,
    palette,
    paletteAnsi,
    options,
    isLatte: baseFlavor === "latte",
  };

  const uiColors = getUiColors(context);
  const tokenColors = getTokenColors(context);

  // Apply dark-specific UI color overrides
  const finalUiColors =
    flavor === "dark" ? { ...uiColors, ...darkUIColorOverrides } : uiColors;

  // Apply dark-specific token color overrides for comments
  // Using muted fg #585b70 for comments to match palette
  const finalTokenColors =
    flavor === "dark"
      ? tokenColors.map((token) => {
          // Override comment color to muted foreground
          if (
            token.scope &&
            (Array.isArray(token.scope)
              ? token.scope.some((s) => s.includes("comment"))
              : token.scope.includes("comment"))
          ) {
            return {
              ...token,
              settings: { ...token.settings, foreground: "#585b70" },
            };
          }
          return token;
        })
      : tokenColors;

  return {
    name:
      flavor === "dark" ? "Catppuccin Dark" : `Catppuccin ${flavorData.name}`,
    type: context.isLatte ? "light" : "dark",
    colors: finalUiColors,
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(context),
    tokenColors: finalTokenColors,
  };
};
