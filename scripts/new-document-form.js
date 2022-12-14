async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return await crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  });
}

let hashHex = "";
let file = {};
let subscribers = [];

function addSub(subInput) {
  if (subInput.trim() && subscribers.every((sub) => sub !== subInput.trim())) {
    subscribers = subscribers.concat(subInput.trim());
    subInput = "";
  }
}

function removeSub(index) {
  subscribers = subscribers.filter((sub, i) => index !== i);
}


let inputPlaceholder = document.getElementById('input-file-placeholder');
inputPlaceholder.insertAdjacentText('beforeend', 'Selecione uma opção');


{/* <li class="subscriber" in:fade={{ delay: 300 }} out:fade>
    <p>{subscriber}</p>
    <button class="remove-sub"> - </button>
</li> */}