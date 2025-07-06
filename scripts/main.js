import { data } from "./data.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("radio-container");
  const amount = document.getElementById("total-amount");

  data.forEach((item) => {

    const wrapper = document.createElement("label");
    wrapper.className = "radio-wrapper  border ";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "unit";
    radio.value = item.noofunit;
    if (item.isBadgeShow) radio.checked = true;

    if (item.isBadgeShow) {
      const badge = document.createElement("div");
      badge.textContent = item.badgeContent;
      badge.className = "badge"
      wrapper.appendChild(badge);
    }

    const cardContent = document.createElement("div");
    cardContent.className = "w-full grid grid-cols-2 gap-4";


    const left = document.createElement("div");
    left.className = "flex flex-col gap-2";

    const topRow = document.createElement("div");
    topRow.className = "flex items-center gap-2";
    topRow.innerHTML = `
      <span class="font-semibold">${item.title}</span>
      <span class="text-xs px-1.5 py-1 bg-primary text-white">${item.offers}</span>
    `;

    const note = document.createElement("span");
    note.className = "text-sm";
    note.textContent = item.description;

    left.appendChild(topRow);
    left.appendChild(note);

    const right = document.createElement("div");
    right.className = "flex flex-col items-end justify-center gap-1";
    right.innerHTML = `
      <span class="text-lg text-secondary font-semibold">${item.price}</span>
      <span class="text-sm text-grey line-through">${item.mrp}</span>
    `;

    const extraContent = document.createElement("div");
    extraContent.className = "extra-info col-span-2";
    extraContent.style.display = "none";

    const table = document.createElement("table");
    table.className = "text-sm table-auto w-full";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr class="text-left">
        <th class="w-4"></th>
        <th class="w-24 font-normal">Size</th>
        <th class="w-24 font-normal">Colour</th>
      </tr>
    `;

    const tbody = document.createElement("tbody");

    for (let i = 0; i < item.noofunit; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="w-10">#${i + 1}</td>
        <td class="w-20">
          <select class="border px-2 py-1 w-full rounded">
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </td>
        <td class="w-32">
          <select class="border px-2 py-1 w-full rounded">
            <option>Black</option>
            <option>White</option>
            <option>Colour</option>
          </select>
        </td>
      `;
      tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    extraContent.appendChild(table);

    cardContent.appendChild(left);
    cardContent.appendChild(right);
    cardContent.appendChild(extraContent);

    wrapper.appendChild(radio);
    wrapper.appendChild(cardContent);
    container.appendChild(wrapper);


    radio.addEventListener("change", () => {

      document.querySelectorAll(".extra-info").forEach((el) => (el.style.display = "none"));
      document.querySelectorAll(".radio-wrapper").forEach((el) => {
        el.classList.remove("border-primary", "bg-primary-shade");
        el.style.border = "2px solid #D6D6D6";
      });

      wrapper.classList.add("border-primary", "bg-primary-shade");
      wrapper.style.border = "2px solid #f85e75";
      extraContent.style.display = "block";
      amount.textContent = item.price;
    });
  });

  const defaultRadio = container.querySelector("input[name='unit']:checked");
  if (defaultRadio) defaultRadio.dispatchEvent(new Event("change"));
});
