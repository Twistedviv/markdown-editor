/**
 * Global state management for the unified markdown editor
 * Manages editor content, view mode, and export states
 */
import { atom } from 'jotai';

export const markdownContentAtom = atom('');
export const isExportingAtom = atom(false);
export const viewModeAtom = atom<'edit' | 'preview'>('edit');
export const isPreviewHintVisibleAtom = atom(false);