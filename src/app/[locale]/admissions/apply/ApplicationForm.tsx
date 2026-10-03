"use client";

import { useEffect, useId, useMemo, useState, useTransition } from "react";

const classes = [
  "Nursery",
  "KG",
  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const currentYear = new Date().getFullYear();

const years = Array.from({ length: currentYear - 1949 }, (_, i) =>
  String(currentYear - i),
);

const nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "Andorran",
  "Angolan",
  "Antiguan and Barbudan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian and Herzegovinian",
  "Motswana",
  "Brazilian",
  "Bruneian",
  "Bulgarian",
  "Burkinabè",
  "Burundian",
  "Cabo Verdean",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comorian",
  "Congolese (Republic of the Congo)",
  "Congolese (Democratic Republic of the Congo)",
  "Costa Rican",
  "Ivorian",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican (Dominican Republic)",
  "Dominican (Dominica)",
  "Dutch",
  "Ecuadorian",
  "Egyptian",
  "Salvadoran",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Eswatini citizen",
  "Ethiopian",
  "Fijian",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Bissau-Guinean",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kiribati",
  "Kuwaiti",
  "Kyrgyzstani",
  "Lao",
  "Latvian",
  "Lebanese",
  "Lesotho citizen",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourgish",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monégasque",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Myanmar citizen",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerien",
  "Nigerian",
  "North Korean",
  "North Macedonian",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Philippine",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Kittitian and Nevisian",
  "Saint Lucian",
  "Saint Vincentian",
  "Samoan",
  "San Marinese",
  "São Toméan",
  "Saudi Arabian",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamese",
  "Swedish",
  "Swiss",
  "Syrian",
  "Tajikistani",
  "Tanzanian",
  "Thai",
  "Timorese",
  "Togolese",
  "Tongan",
  "Trinidadian and Tobagonian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Emirati",
  "British",
  "American",
  "Uruguayan",
  "Uzbekistani",
  "Vanuatuan",
  "Venezuelan",
  "Vietnamese",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
  "Palestinian",
  "Vatican citizen",
  "Other",
];

type Guardian = {
  name: string;
  relationship: string;
  nidNumber: string;
  contactNumber: string;
  occupation: string;
  nationality: string;
  isAlive: boolean;
};

const emptyGuardian = (): Guardian => ({
  name: "",
  relationship: "",
  nidNumber: "",
  contactNumber: "",
  occupation: "",
  nationality: "Bangladeshi",
  isAlive: true,
});

type FormState = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  medium: string;
  applyingClass: string;
  previousInstitution: string;
  birthRegistrationNo: string;
  fatherName: string;
  fatherNidNumber: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  fatherNationality: string;
  motherName: string;
  motherNidNumber: string;
  motherContactNumber: string;
  motherOccupation: string;
  motherNationality: string;
  presentAddress: string;
  permanentAddress: string;
};

const initialState: FormState = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  medium: "",
  applyingClass: "",
  previousInstitution: "",
  birthRegistrationNo: "",
  fatherName: "",
  fatherNidNumber: "",
  fatherContactNumber: "",
  fatherOccupation: "",
  fatherNationality: "",
  motherName: "",
  motherNidNumber: "",
  motherContactNumber: "",
  motherOccupation: "",
  motherNationality: "",
  presentAddress: "",
  permanentAddress: "",
};

function Field({
  label,
  value,
  required = true,
  type = "text",
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[.01em] text-[var(--kc-ink)]">
        {label}
        {required ? (
          <span className="ml-1 text-[var(--kc-brass)]">*</span>
        ) : null}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 text-sm text-[var(--kc-ink)] outline-none transition placeholder:text-[#9b9f99] focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
      />
    </div>
  );
}

/*
 * KCMSC searchable select.
 *
 * Only ONE dropdown can be open at a time.
 */
function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectId = useId();

  useEffect(() => {
    const handleAnotherSelectOpened = (event: Event) => {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== selectId) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("kcmsc-select-open", handleAnotherSelectOpened);

    return () => {
      document.removeEventListener(
        "kcmsc-select-open",
        handleAnotherSelectOpened,
      );
    };
  }, [selectId]);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return options;

    return options.filter((option) => option.toLowerCase().includes(query));
  }, [options, search]);

  const selectedLabel = value || placeholder;

  const toggleDropdown = () => {
    if (open) {
      setOpen(false);
      setSearch("");
      return;
    }

    document.dispatchEvent(
      new CustomEvent("kcmsc-select-open", {
        detail: selectId,
      }),
    );

    setSearch("");
    setOpen(true);
  };

  return (
    <div className="relative">
      <label className="block text-[11px] font-medium tracking-[.01em] text-[var(--kc-ink)]">
        {label}
        <span className="ml-1 text-[var(--kc-brass)]">*</span>
      </label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleDropdown}
        className={`mt-2 flex h-11 w-full items-center justify-between border bg-[var(--kc-paper)] px-3.5 text-left text-sm outline-none transition ${
          open
            ? "border-[var(--kc-green)] ring-1 ring-[var(--kc-green)]/20"
            : "border-[var(--kc-line)] hover:border-[var(--kc-green)]"
        }`}
      >
        <span className={value ? "text-[var(--kc-ink)]" : "text-[#9b9f99]"}>
          {selectedLabel}
        </span>

        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-[var(--kc-muted)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden border border-[var(--kc-line)] bg-[var(--kc-paper)] shadow-[0_14px_40px_rgba(25,45,34,0.12)]">
          <div className="border-b border-[var(--kc-line)] bg-[var(--kc-soft)] p-2">
            <div className="relative">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--kc-muted)]"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />

                <path
                  d="M16 16l4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>

              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="h-10 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] pl-9 pr-3 text-sm text-[var(--kc-ink)] outline-none placeholder:text-[#9b9f99] focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
              />
            </div>
          </div>

          <div
            role="listbox"
            className="max-h-64 overflow-y-auto overscroll-contain"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const selected = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex min-h-10 w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition ${
                      selected
                        ? "bg-[var(--kc-green)] text-white"
                        : "text-[var(--kc-ink)] hover:bg-[var(--kc-soft)] hover:text-[var(--kc-green-dark)]"
                    }`}
                  >
                    <span>{option}</span>

                    {selected ? (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="ml-3 shrink-0"
                      >
                        <path
                          d="M5 12.5l4.2 4L19 7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-xs text-[var(--kc-muted)]">
                No matches found.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/*
 * KCMSC Date of Birth selector.
 *
 * Stored in FormState as:
 *
 * YYYY-MM-DD
 *
 * Example:
 *
 * Day: 03
 * Month: September
 * Year: 2008
 *
 * Stored value:
 * 2008-09-03
 */
function DateOfBirthField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  /*
   * Sync the three selectors with the parent's
   * YYYY-MM-DD value.
   */
  useEffect(() => {
    if (!value) {
      return;
    }

    const parts = value.split("-");

    const year = parts[0] ?? "";
    const month = parts[1] ?? "";
    const day = parts[2] ?? "";

    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);
  }, [value]);

  /*
   * Calculate valid days for the currently selected
   * month and year.
   *
   * This also handles leap years.
   */
  const availableDays = useMemo(() => {
    if (!selectedYear || !selectedMonth) {
      return days;
    }

    const daysInMonth = new Date(
      Number(selectedYear),
      Number(selectedMonth),
      0,
    ).getDate();

    return Array.from({ length: daysInMonth }, (_, i) =>
      String(i + 1).padStart(2, "0"),
    );
  }, [selectedYear, selectedMonth]);

  /*
   * Build YYYY-MM-DD only when all three parts exist.
   */
  const commitDate = (year: string, month: string, day: string) => {
    if (!year || !month || !day) {
      onChange("");
      return;
    }

    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    const safeDay = Math.min(Number(day), daysInMonth);

    const formattedDay = String(safeDay).padStart(2, "0");

    onChange(`${year}-${month}-${formattedDay}`);
  };

  /*
   * DAY
   */
  const handleDayChange = (day: string) => {
    setSelectedDay(day);

    commitDate(selectedYear, selectedMonth, day);
  };

  /*
   * MONTH
   */
  const handleMonthChange = (monthName: string) => {
    const monthIndex = months.indexOf(monthName);

    /*
     * This should never happen because the option comes
     * directly from the months array, but keeping the
     * guard makes the component safer.
     */
    if (monthIndex < 0) {
      return;
    }

    const monthValue = String(monthIndex + 1).padStart(2, "0");

    let nextDay = selectedDay;

    /*
     * If the existing day doesn't exist in the newly
     * selected month, move it to the last valid day.
     */
    if (selectedYear && nextDay) {
      const daysInMonth = new Date(
        Number(selectedYear),
        Number(monthValue),
        0,
      ).getDate();

      if (Number(nextDay) > daysInMonth) {
        nextDay = String(daysInMonth).padStart(2, "0");
        setSelectedDay(nextDay);
      }
    }

    setSelectedMonth(monthValue);

    commitDate(selectedYear, monthValue, nextDay);
  };

  /*
   * YEAR
   */
  const handleYearChange = (year: string) => {
    let nextDay = selectedDay;

    /*
     * Handle leap years.
     *
     * Example:
     *
     * 29 February 2024
     * ↓
     * change year to 2023
     * ↓
     * 28 February 2023
     */
    if (selectedMonth && nextDay) {
      const daysInMonth = new Date(
        Number(year),
        Number(selectedMonth),
        0,
      ).getDate();

      if (Number(nextDay) > daysInMonth) {
        nextDay = String(daysInMonth).padStart(2, "0");

        setSelectedDay(nextDay);
      }
    }

    setSelectedYear(year);

    commitDate(year, selectedMonth, nextDay);
  };

  /*
   * FIX:
   *
   * `months[index]` can technically be undefined.
   *
   * `?? ""` guarantees SelectField always receives
   * a string, which satisfies TypeScript.
   */
  const selectedMonthLabel = selectedMonth
    ? (months[Number(selectedMonth) - 1] ?? "")
    : "";

  return (
    <div>
      <label className="block text-[11px] font-medium tracking-[.01em] text-[var(--kc-ink)]">
        Date of Birth
        <span className="ml-1 text-[var(--kc-brass)]">*</span>
      </label>

      <div className="mt-2 grid gap-3 sm:grid-cols-[0.75fr_1.45fr_1fr]">
        {/* DAY */}
        <SelectField
          label="Day"
          value={selectedDay}
          onChange={handleDayChange}
          options={availableDays}
          placeholder="Day"
        />

        {/* MONTH */}
        <SelectField
          label="Month"
          value={selectedMonthLabel}
          onChange={handleMonthChange}
          options={months}
          placeholder="Month"
        />

        {/* YEAR */}
        <SelectField
          label="Year"
          value={selectedYear}
          onChange={handleYearChange}
          options={years}
          placeholder="Year"
        />
      </div>

      <p className="mt-2 text-xs text-[var(--kc-muted)]">
        Select the date exactly as shown on the birth registration certificate.
      </p>
    </div>
  );
}

export function ApplicationForm({
  action,
  sections,
  fields: _fields,
  submitLabel,
  submittingLabel,
}: {
  action: (formData: FormData) => void;
  sections: Record<string, string>;
  fields: Record<string, unknown>;
  submitLabel: string;
  submittingLabel: string;
}) {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState<FormState>(initialState);

  const [fatherAlive, setFatherAlive] = useState(true);

  const [motherAlive, setMotherAlive] = useState(true);

  const [guardians, setGuardians] = useState<Guardian[]>([]);

  const [certificate, setCertificate] = useState<File | null>(null);

  const [error, setError] = useState("");

  const [pending, startTransition] = useTransition();

  /*
   * Automatically calculate student's age.
   */
  const age = useMemo(() => {
    if (!form.dateOfBirth) {
      return "";
    }

    const [year, month, day] = form.dateOfBirth.split("-").map(Number);

    if (!year || !month || !day) {
      return "";
    }

    const today = new Date();

    let a = today.getFullYear() - year;

    const birthdayPassed =
      today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() >= day);

    if (!birthdayPassed) {
      a--;
    }

    return a >= 0 ? String(a) : "";
  }, [form.dateOfBirth]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const steps = [
    {
      title: sections.student,
      short: "Student",
      number: "01",
    },
    {
      title: sections.father,
      short: "Father",
      number: "02",
    },
    {
      title: sections.mother,
      short: "Mother",
      number: "03",
    },
    {
      title: sections.guardians,
      short: "Guardians",
      number: "04",
    },
    {
      title: sections.address,
      short: "Address",
      number: "05",
    },
  ];

  const stepValid = () => {
    setError("");

    /*
     * STUDENT
     */
    if (
      step === 0 &&
      (!form.fullName ||
        !form.dateOfBirth ||
        !form.gender ||
        !form.nationality ||
        !form.medium ||
        !form.applyingClass ||
        !form.birthRegistrationNo ||
        !certificate)
    ) {
      setError(
        "Please complete every required field in this section before continuing.",
      );

      return false;
    }

    /*
     * FATHER
     */
    if (
      step === 1 &&
      (!form.fatherName ||
        !form.fatherNidNumber ||
        (fatherAlive && !form.fatherContactNumber) ||
        !form.fatherOccupation ||
        !form.fatherNationality)
    ) {
      setError(
        "Please complete every required field in this section before continuing.",
      );

      return false;
    }

    /*
     * MOTHER
     */
    if (
      step === 2 &&
      (!form.motherName ||
        !form.motherNidNumber ||
        (motherAlive && !form.motherContactNumber) ||
        !form.motherOccupation ||
        !form.motherNationality)
    ) {
      setError(
        "Please complete every required field in this section before continuing.",
      );

      return false;
    }

    /*
     * GUARDIANS
     */
    if (
      step === 3 &&
      guardians.some(
        (g) =>
          !g.name ||
          !g.relationship ||
          !g.nidNumber ||
          !g.contactNumber ||
          !g.occupation ||
          !g.nationality,
      )
    ) {
      setError(
        "Complete every added guardian or remove the unfinished guardian.",
      );

      return false;
    }

    /*
     * ADDRESS
     */
    if (step === 4 && (!form.presentAddress || !form.permanentAddress)) {
      setError("Please complete both addresses before submitting.");

      return false;
    }

    return true;
  };

  const updateGuardian = (index: number, patch: Partial<Guardian>) => {
    setGuardians((items) =>
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              ...patch,
            }
          : item,
      ),
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stepValid()) {
      return;
    }

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.set(key, value);
    });

    data.set("fatherIsAlive", fatherAlive ? "on" : "");

    data.set("motherIsAlive", motherAlive ? "on" : "");

    data.set("guardiansJson", JSON.stringify(guardians));

    if (certificate) {
      data.set("certificate", certificate);
    }

    startTransition(() => {
      void action(data);
    });
  };

  return (
    <form onSubmit={submit} className="max-w-[920px]">
      {/* PROGRESS */}
      <nav
        aria-label="Application progress"
        className="mb-10 border-y border-[var(--kc-line)] bg-[var(--kc-paper)]"
      >
        <ol className="grid grid-cols-2 sm:grid-cols-5">
          {steps.map((item, index) => (
            <li key={item.number}>
              <button
                type="button"
                onClick={() => index < step && setStep(index)}
                disabled={index > step}
                className={`flex w-full items-center gap-3 border-b border-[var(--kc-line)] px-4 py-4 text-left transition sm:border-b-0 sm:border-r ${
                  index === step
                    ? "bg-[var(--kc-green)] text-white"
                    : index < step
                      ? "text-[var(--kc-green-dark)] hover:bg-[var(--kc-soft)]"
                      : "text-[var(--kc-muted)]"
                }`}
              >
                <span
                  className={`font-heading text-lg ${
                    index === step ? "text-white" : "text-[var(--kc-brass)]"
                  }`}
                >
                  {item.number}
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[.08em]">
                  {item.short}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* ERROR */}
      {error ? (
        <p
          role="alert"
          className="mb-7 border-l-2 border-[#a7473b] bg-[#a7473b]/5 px-4 py-3 text-sm leading-6 text-[#8c3c32]"
        >
          {error}
        </p>
      ) : null}

      <fieldset className="border-t border-[var(--kc-line)] pt-7">
        <legend className="font-heading text-3xl leading-tight text-[var(--kc-green-dark)] sm:text-4xl">
          {steps[step]?.title ?? ""}
        </legend>

        <p className="mt-2 text-xs leading-6 text-[var(--kc-muted)]">
          Fields marked with <span className="text-[var(--kc-brass)]">*</span>{" "}
          are required.
        </p>

        {/* ====================================================== */}
        {/* STUDENT */}
        {/* ====================================================== */}

        {step === 0 ? (
          <div className="mt-8 space-y-6">
            <Field
              label="Legal Name"
              value={form.fullName}
              onChange={(v) => set("fullName", v)}
            />

            <div className="grid gap-6 sm:grid-cols-[1fr_180px]">
              <DateOfBirthField
                value={form.dateOfBirth}
                onChange={(v) => set("dateOfBirth", v)}
              />

              <div>
                <label className="block text-[11px] font-medium text-[var(--kc-ink)]">
                  Age
                </label>

                <input
                  value={age ? `${age} years` : ""}
                  readOnly
                  aria-label="Calculated age"
                  placeholder="Calculated automatically"
                  className="mt-2 h-11 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-soft)] px-3.5 text-sm text-[var(--kc-muted)] outline-none"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Gender"
                value={form.gender}
                onChange={(v) => set("gender", v)}
                options={["Female", "Male", "Other"]}
                placeholder="Select gender"
              />

              <SelectField
                label="Nationality"
                value={form.nationality}
                onChange={(v) => set("nationality", v)}
                options={nationalities}
                placeholder="Select nationality"
              />
            </div>

            {/* MEDIUM */}
            <div>
              <p className="block text-[11px] font-medium text-[var(--kc-ink)]">
                Medium
                <span className="ml-1 text-[var(--kc-brass)]">*</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-6">
                {["Bangla Version", "English Version"].map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[var(--kc-ink)]"
                  >
                    <input
                      type="radio"
                      name="medium"
                      checked={form.medium === option}
                      onChange={() => set("medium", option)}
                      className="accent-[#176b45]"
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* CLASS */}
            <SelectField
              label="Class"
              value={form.applyingClass}
              onChange={(v) => set("applyingClass", v)}
              options={classes}
              placeholder="Select class"
            />

            {/* OPTIONAL PREVIOUS INSTITUTION */}
            <Field
              label="Previous Institution"
              value={form.previousInstitution}
              required={false}
              onChange={(v) => set("previousInstitution", v)}
            />

            {/* BIRTH REGISTRATION */}
            <Field
              label="Birth Registration No."
              value={form.birthRegistrationNo}
              onChange={(v) => set("birthRegistrationNo", v)}
            />

            {/* CERTIFICATE */}
            <div>
              <label className="block text-[11px] font-medium text-[var(--kc-ink)]">
                Certificate
                <span className="ml-1 text-[var(--kc-brass)]">*</span>
              </label>

              <label className="mt-2 flex min-h-[88px] cursor-pointer items-center justify-between gap-5 border border-dashed border-[var(--kc-line)] bg-[var(--kc-paper)] px-5 py-4 transition hover:border-[var(--kc-green)] hover:bg-white">
                <div>
                  <p className="text-sm text-[var(--kc-ink)]">
                    {certificate
                      ? certificate.name
                      : "Choose a certificate file"}
                  </p>

                  <p className="mt-1 text-xs text-[var(--kc-muted)]">
                    PDF, JPG or PNG · maximum 5 MB
                  </p>
                </div>

                <span className="kc-classic-button kc-classic-button-outline shrink-0">
                  Browse
                </span>

                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  required={!certificate}
                  onChange={(e) => setCertificate(e.target.files?.[0] ?? null)}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ) : null}

        {/* ====================================================== */}
        {/* FATHER */}
        {/* ====================================================== */}

        {step === 1 ? (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Father's Name"
                value={form.fatherName}
                onChange={(v) => set("fatherName", v)}
              />

              <Field
                label="Father's NID Number"
                value={form.fatherNidNumber}
                onChange={(v) => set("fatherNidNumber", v)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Father's Contact Number"
                value={form.fatherContactNumber}
                required={fatherAlive}
                onChange={(v) => set("fatherContactNumber", v)}
              />

              <Field
                label="Father's Occupation"
                value={form.fatherOccupation}
                onChange={(v) => set("fatherOccupation", v)}
              />
            </div>

            <SelectField
              label="Father's Nationality"
              value={form.fatherNationality}
              onChange={(v) => set("fatherNationality", v)}
              options={nationalities}
              placeholder="Select nationality"
            />

            <label className="flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm text-[var(--kc-ink)]">
              <input
                type="checkbox"
                checked={fatherAlive}
                onChange={(e) => setFatherAlive(e.target.checked)}
                className="h-4 w-4 accent-[#176b45]"
              />
              Father is alive
            </label>
          </div>
        ) : null}

        {/* ====================================================== */}
        {/* MOTHER */}
        {/* ====================================================== */}

        {step === 2 ? (
          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Mother's Name"
                value={form.motherName}
                onChange={(v) => set("motherName", v)}
              />

              <Field
                label="Mother's NID Number"
                value={form.motherNidNumber}
                onChange={(v) => set("motherNidNumber", v)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Mother's Contact Number"
                value={form.motherContactNumber}
                required={motherAlive}
                onChange={(v) => set("motherContactNumber", v)}
              />

              <Field
                label="Mother's Occupation"
                value={form.motherOccupation}
                onChange={(v) => set("motherOccupation", v)}
              />
            </div>

            <SelectField
              label="Mother's Nationality"
              value={form.motherNationality}
              onChange={(v) => set("motherNationality", v)}
              options={nationalities}
              placeholder="Select nationality"
            />

            <label className="flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm text-[var(--kc-ink)]">
              <input
                type="checkbox"
                checked={motherAlive}
                onChange={(e) => setMotherAlive(e.target.checked)}
                className="h-4 w-4 accent-[#176b45]"
              />
              Mother is alive
            </label>
          </div>
        ) : null}

        {/* ====================================================== */}
        {/* GUARDIANS */}
        {/* ====================================================== */}

        {step === 3 ? (
          <div className="mt-8">
            <p className="max-w-2xl text-sm leading-7 text-[var(--kc-muted)]">
              Add another guardian only when necessary. You can leave this
              section empty.
            </p>

            <div className="mt-6 space-y-5">
              {guardians.map((g, i) => (
                <div
                  key={i}
                  className="border border-[var(--kc-line)] bg-[var(--kc-paper)] p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--kc-line)] pb-4">
                    <h3 className="font-heading text-xl text-[var(--kc-green-dark)]">
                      Guardian {i + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setGuardians((items) => items.filter((_, j) => j !== i))
                      }
                      className="text-[10px] font-medium uppercase tracking-[.08em] text-[#8c3c32]"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={g.name}
                      onChange={(v) =>
                        updateGuardian(i, {
                          name: v,
                        })
                      }
                    />

                    <Field
                      label="Relationship"
                      value={g.relationship}
                      onChange={(v) =>
                        updateGuardian(i, {
                          relationship: v,
                        })
                      }
                    />

                    <Field
                      label="NID Number"
                      value={g.nidNumber}
                      onChange={(v) =>
                        updateGuardian(i, {
                          nidNumber: v,
                        })
                      }
                    />

                    <Field
                      label="Contact Number"
                      value={g.contactNumber}
                      onChange={(v) =>
                        updateGuardian(i, {
                          contactNumber: v,
                        })
                      }
                    />

                    <Field
                      label="Occupation"
                      value={g.occupation}
                      onChange={(v) =>
                        updateGuardian(i, {
                          occupation: v,
                        })
                      }
                    />

                    <SelectField
                      label="Nationality"
                      value={g.nationality}
                      onChange={(v) =>
                        updateGuardian(i, {
                          nationality: v,
                        })
                      }
                      options={nationalities}
                      placeholder="Select nationality"
                    />
                  </div>

                  <label className="mt-5 flex items-center gap-3 border-t border-[var(--kc-line)] pt-5 text-sm">
                    <input
                      type="checkbox"
                      checked={g.isAlive}
                      onChange={(e) =>
                        updateGuardian(i, {
                          isAlive: e.target.checked,
                        })
                      }
                      className="h-4 w-4 accent-[#176b45]"
                    />
                    Guardian is alive
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setGuardians((items) => [...items, emptyGuardian()])
              }
              className="kc-classic-button kc-classic-button-outline mt-6"
            >
              + Add another guardian
            </button>
          </div>
        ) : null}

        {/* ====================================================== */}
        {/* ADDRESS */}
        {/* ====================================================== */}

        {step === 4 ? (
          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-[11px] font-medium text-[var(--kc-ink)]">
                Present Address
                <span className="ml-1 text-[var(--kc-brass)]">*</span>
              </label>

              <textarea
                required
                value={form.presentAddress}
                onChange={(e) => set("presentAddress", e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 py-3 text-sm outline-none transition focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[var(--kc-ink)]">
                Permanent Address
                <span className="ml-1 text-[var(--kc-brass)]">*</span>
              </label>

              <textarea
                required
                value={form.permanentAddress}
                onChange={(e) => set("permanentAddress", e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-none border border-[var(--kc-line)] bg-[var(--kc-paper)] px-3.5 py-3 text-sm outline-none transition focus:border-[var(--kc-green)] focus:ring-1 focus:ring-[var(--kc-green)]/20"
              />
            </div>
          </div>
        ) : null}
      </fieldset>

      {/* ====================================================== */}
      {/* NAVIGATION */}
      {/* ====================================================== */}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--kc-line)] pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep((current) => current - 1);
            }}
            className="kc-classic-button kc-classic-button-outline"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => stepValid() && setStep((current) => current + 1)}
            className="kc-classic-button kc-classic-button-primary"
          >
            Continue{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="kc-classic-button kc-classic-button-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? submittingLabel : submitLabel}{" "}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
