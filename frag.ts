export default function frag(children: Node[]) {
  const docFragment = document.createDocumentFragment();
  for (const child of children) docFragment.appendChild(child);
  return docFragment;
}
