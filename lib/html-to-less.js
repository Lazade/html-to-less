'use babel';

import { CompositeDisposable } from 'atom';
import { format } from './format';
import { facilitate } from './facilitate';
import { uni } from './uni';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-to-less:generate': () => this.generate()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  generate() {
    const pane = atom.workspace.getActivePane();
    const editor = pane.getActiveEditor();
    const preText = editor.getSelectedText();
    const simJson = facilitate(preText);
    const uniJson = uni(simJson);
    const less = format(uniJson);
    if(less) {
      atom.clipboard.write(less);
      atom.notifications.addSuccess('LESS template copied to clipboard.');
    }else{
      atom.notifications.addError('Parsing failed');
    }
  }

};
