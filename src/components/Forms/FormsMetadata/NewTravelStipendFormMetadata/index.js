/*
 Include form metadata such as placeholders, labels, dropdown select choices,
 button toggler options etc.
*/
import inputLabels from './inputLabels';

export default (editing) =>  ({
  inputLabels: inputLabels(editing),
});
