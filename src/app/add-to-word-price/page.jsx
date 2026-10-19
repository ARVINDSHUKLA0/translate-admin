
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const RAW_API_URL = (
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
// )
//   .trim()
//   .replace(/\/+$/, "")
//   .replace(/\/api$/i, "");

// const SETTINGS_URL = `${RAW_API_URL}/api/word-price-settings`;

// export default function AddToWordPricePage() {
//   const [pricePerPage, setPricePerPage] = useState("100");
//   const [wordsPerPage, setWordsPerPage] = useState("250");
//   const [baseLanguage, setBaseLanguage] = useState("English");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [removing, setRemoving] = useState(false);

//   const loadSettings = useCallback(async (showError = true) => {
//     setLoading(true);

//     try {
//       const response = await fetch(SETTINGS_URL, {
//         cache: "no-store",
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to load pricing settings."
//         );
//       }

//       const data = result.data || {};

//       setPricePerPage(String(data.pricePerPage ?? 100));
//       setWordsPerPage(String(data.wordsPerPage ?? 250));
//       setBaseLanguage(data.baseLanguage || "English");
//     } catch (error) {
//       if (showError) {
//         await Swal.fire({
//           icon: "error",
//           title: "Unable to Load Settings",
//           text: error.message || "Please check your server.",
//           confirmButtonText: "OK",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadSettings();
//   }, [loadSettings]);

//   const saveSettings = async (event) => {
//     event.preventDefault();

//     const price = Number(pricePerPage);
//     const words = Number(wordsPerPage);
//     const language = baseLanguage.trim();

//     if (!Number.isFinite(price) || price < 0) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Invalid Price",
//         text: "Enter a valid non-negative price.",
//       });
//       return;
//     }

//     if (
//       wordsPerPage.trim() === "" ||
//       !Number.isSafeInteger(words) ||
//       words < 1
//     ) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Invalid Words Per Page",
//         text: "Enter a positive whole number.",
//       });
//       return;
//     }

//     if (!language) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Base Language Required",
//         text: "Please enter the base language.",
//       });
//       return;
//     }

//     setSaving(true);

//     try {
//       const currentResponse = await fetch(SETTINGS_URL, {
//         cache: "no-store",
//       });

//       const currentResult = await currentResponse.json();

//       if (!currentResponse.ok || currentResult?.success === false) {
//         throw new Error(
//           currentResult?.message || "Unable to load existing settings."
//         );
//       }

//       const current = currentResult.data || {};

//       const payload = {
//         currency: current.currency || "USD",
//         pricePerPage: price,
//         wordsPerPage: words,
//         baseLanguage: language,
//         baseLanguageMultiplier: Number(
//           current.baseLanguageMultiplier ?? 1
//         ),
//         otherLanguageMultiplier: Number(
//           current.otherLanguageMultiplier ?? 2
//         ),
//         minimumPages: Number(current.minimumPages ?? 1),
//         maxFileSizeMB: Number(current.maxFileSizeMB ?? 100),
//         isActive: current.isActive !== false,
//       };

//       const response = await fetch(SETTINGS_URL, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to save pricing settings."
//         );
//       }

//       const saved = result.data || {};

//       setPricePerPage(String(saved.pricePerPage ?? price));
//       setWordsPerPage(String(saved.wordsPerPage ?? words));
//       setBaseLanguage(saved.baseLanguage || language);

//       await Swal.fire({
//         icon: "success",
//         title: "Pricing Updated",
//         text: `Settings saved. ${saved.wordsPerPage ?? words} words will count as one billable page.`,
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: error.message || "Unable to save settings.",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const removeSettings = async () => {
//     const confirmation = await Swal.fire({
//       icon: "warning",
//       title: "Remove Word Pricing?",
//       text: "The saved settings will be deleted. Default settings may be used when settings are requested again.",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Remove",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#dc3545",
//       reverseButtons: true,
//     });

//     if (!confirmation.isConfirmed) return;

//     setRemoving(true);

//     try {
//       const response = await fetch(SETTINGS_URL, {
//         method: "DELETE",
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to remove pricing settings."
//         );
//       }

//       await Swal.fire({
//         icon: "success",
//         title: "Settings Removed",
//         text: "Word pricing settings were removed successfully.",
//         confirmButtonText: "OK",
//       });

//       await loadSettings(false);
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Remove Failed",
//         text: error.message || "Unable to remove settings.",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setRemoving(false);
//     }
//   };

//   return (
//     <main className="container-fluid py-4">
//       <div className="mb-4">
//         <h1 className="h3 fw-bold mb-1">Word-Based Pricing</h1>
//         <p className="text-secondary mb-0">
//           Configure pricing for documents uploaded by clients.
//         </p>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="card-header bg-white border-bottom py-3">
//           <h2 className="h5 mb-1">Pricing Configuration</h2>
//           <p className="text-secondary small mb-0">
//             Set price per page, words per page and the base language.
//           </p>
//         </div>

//         {loading ? (
//           <div className="card-body p-4">
//             <div className="d-flex align-items-center gap-2">
//               <span
//                 className="spinner-border spinner-border-sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//               <span>Loading pricing settings...</span>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={saveSettings}>
//             <div className="card-body p-4">
//               <div className="row g-3">
//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="pricePerPage"
//                     className="form-label fw-semibold"
//                   >
//                     Price per page (USD)
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text">$</span>
//                     <input
//                       id="pricePerPage"
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       className="form-control"
//                       value={pricePerPage}
//                       onChange={(event) =>
//                         setPricePerPage(event.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="wordsPerPage"
//                     className="form-label fw-semibold"
//                   >
//                     Words per page
//                   </label>

//                   <input
//                     id="wordsPerPage"
//                     type="number"
//                     min="1"
//                     step="1"
//                     className="form-control"
//                     value={wordsPerPage}
//                     onChange={(event) =>
//                       setWordsPerPage(event.target.value)
//                     }
//                     required
//                   />

//                   <small className="text-secondary">
//                     Enter how many words count as one billable page.
//                   </small>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="baseLanguage"
//                     className="form-label fw-semibold"
//                   >
//                     Base language
//                   </label>

//                   <input
//                     id="baseLanguage"
//                     type="text"
//                     className="form-control"
//                     value={baseLanguage}
//                     onChange={(event) =>
//                       setBaseLanguage(event.target.value)
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="card-footer bg-white border-top p-3 d-flex flex-wrap justify-content-end gap-2">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={removeSettings}
//                 disabled={saving || removing}
//               >
//                 {removing ? "Removing..." : "Remove Settings"}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => loadSettings()}
//                 disabled={saving || removing}
//               >
//                 Reload Settings
//               </button>

//               <button
//                 type="submit"
//                 className="btn btn-primary px-4"
//                 disabled={saving || removing}
//               >
//                 {saving ? "Saving..." : "Save Settings"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </main>
//   );
// }























// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Swal from "sweetalert2";

// const RAW_API_URL = (
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
// )
//   .trim()
//   .replace(/\/+$/, "")
//   .replace(/\/api$/i, "");

// const SETTINGS_URL = `${RAW_API_URL}/api/word-price-settings`;

// export default function AddToWordPricePage() {
//   const [pricePerPage, setPricePerPage] = useState("100");
//   const [wordsPerPage, setWordsPerPage] = useState("250");
//   const [baseLanguage, setBaseLanguage] = useState("English");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [removing, setRemoving] = useState(false);

//   const loadSettings = useCallback(async (showError = true) => {
//     setLoading(true);

//     try {
//       const response = await fetch(SETTINGS_URL, {
//         cache: "no-store",
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to load pricing settings."
//         );
//       }

//       const data = result.data || {};

//       setPricePerPage(String(data.pricePerPage ?? 100));
//       setWordsPerPage(String(data.wordsPerPage ?? 250));
//       setBaseLanguage(data.baseLanguage || "English");
//     } catch (error) {
//       if (showError) {
//         await Swal.fire({
//           icon: "error",
//           title: "Unable to Load Settings",
//           text: error.message || "Please check your server.",
//           confirmButtonText: "OK",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadSettings();
//   }, [loadSettings]);

//   const saveSettings = async (event) => {
//     event.preventDefault();

//     const price = Number(pricePerPage);
//     const words = Number(wordsPerPage);
//     const language = baseLanguage.trim();

//     if (!Number.isFinite(price) || price < 0) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Invalid Price",
//         text: "Enter a valid non-negative price.",
//       });
//       return;
//     }

//     if (
//       wordsPerPage.trim() === "" ||
//       !Number.isSafeInteger(words) ||
//       words < 1
//     ) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Invalid Words Per Page",
//         text: "Enter a positive whole number.",
//       });
//       return;
//     }

//     if (!language) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Base Language Required",
//         text: "Please enter the base language.",
//       });
//       return;
//     }

//     setSaving(true);

//     try {
//       const currentResponse = await fetch(SETTINGS_URL, {
//         cache: "no-store",
//       });

//       const currentResult = await currentResponse.json();

//       if (!currentResponse.ok || currentResult?.success === false) {
//         throw new Error(
//           currentResult?.message || "Unable to load existing settings."
//         );
//       }

//       const current = currentResult.data || {};

//       const payload = {
//         currency: current.currency || "USD",
//         pricePerPage: price,
//         wordsPerPage: words,
//         baseLanguage: language,
//         baseLanguageMultiplier: Number(
//           current.baseLanguageMultiplier ?? 1
//         ),
//         otherLanguageMultiplier: Number(
//           current.otherLanguageMultiplier ?? 2
//         ),
//         minimumPages: Number(current.minimumPages ?? 1),
//         maxFileSizeMB: Number(current.maxFileSizeMB ?? 100),
//         isActive: current.isActive !== false,
//       };

//       const response = await fetch(SETTINGS_URL, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to save pricing settings."
//         );
//       }

//       const saved = result.data || {};

//       setPricePerPage(String(saved.pricePerPage ?? price));
//       setWordsPerPage(String(saved.wordsPerPage ?? words));
//       setBaseLanguage(saved.baseLanguage || language);

//       await Swal.fire({
//         icon: "success",
//         title: "Pricing Updated",
//         text: `Settings saved. ${saved.wordsPerPage ?? words} words will count as one billable page.`,
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: error.message || "Unable to save settings.",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const removeSettings = async () => {
//     const confirmation = await Swal.fire({
//       icon: "warning",
//       title: "Remove Word Pricing?",
//       text: "The saved settings will be deleted. Default settings may be used when settings are requested again.",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Remove",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#dc3545",
//       reverseButtons: true,
//     });

//     if (!confirmation.isConfirmed) return;

//     setRemoving(true);

//     try {
//       const response = await fetch(SETTINGS_URL, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (!response.ok || result?.success === false) {
//         throw new Error(
//           result?.message || "Unable to remove pricing settings."
//         );
//       }

//       await Swal.fire({
//         icon: "success",
//         title: "Settings Removed",
//         text: "Word pricing settings were removed successfully.",
//         confirmButtonText: "OK",
//       });

//       await loadSettings(false);
//     } catch (error) {
//       await Swal.fire({
//         icon: "error",
//         title: "Remove Failed",
//         text: error.message || "Unable to remove settings.",
//         confirmButtonText: "OK",
//       });
//     } finally {
//       setRemoving(false);
//     }
//   };

//   return (
//     <main className="container-fluid py-4">
//       <div className="mb-4">
//         <h1 className="h3 fw-bold mb-1">Word-Based Pricing</h1>
//         <p className="text-secondary mb-0">
//           Configure pricing for documents uploaded by clients.
//         </p>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="card-header bg-white border-bottom py-3">
//           <h2 className="h5 mb-1">Pricing Configuration</h2>
//           <p className="text-secondary small mb-0">
//             Set price per page, words per page and the base language.
//           </p>
//         </div>

//         {loading ? (
//           <div className="card-body p-4">
//             <div className="d-flex align-items-center gap-2">
//               <span
//                 className="spinner-border spinner-border-sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//               <span>Loading pricing settings...</span>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={saveSettings}>
//             <div className="card-body p-4">
//               <div className="row g-3">
//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="pricePerPage"
//                     className="form-label fw-semibold"
//                   >
//                     Price per page (USD)
//                   </label>

//                   <div className="input-group">
//                     <span className="input-group-text">$</span>
//                     <input
//                       id="pricePerPage"
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       className="form-control"
//                       value={pricePerPage}
//                       onChange={(event) =>
//                         setPricePerPage(event.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="wordsPerPage"
//                     className="form-label fw-semibold"
//                   >
//                     Words per page
//                   </label>

//                   <input
//                     id="wordsPerPage"
//                     type="number"
//                     min="1"
//                     step="1"
//                     className="form-control"
//                     value={wordsPerPage}
//                     onChange={(event) =>
//                       setWordsPerPage(event.target.value)
//                     }
//                     required
//                   />

//                   <small className="text-secondary">
//                     Enter how many words count as one billable page.
//                   </small>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label
//                     htmlFor="baseLanguage"
//                     className="form-label fw-semibold"
//                   >
//                     Base language
//                   </label>

//                   <input
//                     id="baseLanguage"
//                     type="text"
//                     className="form-control"
//                     value={baseLanguage}
//                     onChange={(event) =>
//                       setBaseLanguage(event.target.value)
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="card-footer bg-white border-top p-3 d-flex flex-wrap justify-content-end gap-2">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger"
//                 onClick={removeSettings}
//                 disabled={saving || removing}
//               >
//                 {removing ? "Removing..." : "Remove Settings"}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => loadSettings()}
//                 disabled={saving || removing}
//               >
//                 Reload Settings
//               </button>

//               <button
//                 type="submit"
//                 className="btn btn-primary px-4"
//                 disabled={saving || removing}
//               >
//                 {saving ? "Saving..." : "Save Settings"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </main>
//   );
// }














"use client";

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { peek, fetchJson, invalidate, WORD_PRICE_URL } from "@/lib/apiCache";

const RAW_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
)
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

const SETTINGS_URL = WORD_PRICE_URL;

export default function AddToWordPricePage() {
  const cachedSettings = peek(SETTINGS_URL)?.data;

  const [pricePerPage, setPricePerPage] = useState(
    String(cachedSettings?.pricePerPage ?? 100)
  );
  const [wordsPerPage, setWordsPerPage] = useState(
    String(cachedSettings?.wordsPerPage ?? 250)
  );
  const [baseLanguage, setBaseLanguage] = useState(
    cachedSettings?.baseLanguage || "English"
  );
  // Spinner only when nothing is cached yet.
  const [loading, setLoading] = useState(() => peek(SETTINGS_URL) === undefined);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const loadSettings = useCallback(async (showError = true) => {
    if (peek(SETTINGS_URL) === undefined) setLoading(true);

    try {
      const result = await fetchJson(SETTINGS_URL);

      const data = result.data || {};

      setPricePerPage(String(data.pricePerPage ?? 100));
      setWordsPerPage(String(data.wordsPerPage ?? 250));
      setBaseLanguage(data.baseLanguage || "English");
    } catch (error) {
      if (showError) {
        await Swal.fire({
          icon: "error",
          title: "Unable to Load Settings",
          text: error.message || "Please check your server.",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const saveSettings = async (event) => {
    event.preventDefault();

    const price = Number(pricePerPage);
    const words = Number(wordsPerPage);
    const language = baseLanguage.trim();

    if (!Number.isFinite(price) || price < 0) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Price",
        text: "Enter a valid non-negative price.",
      });
      return;
    }

    if (
      wordsPerPage.trim() === "" ||
      !Number.isSafeInteger(words) ||
      words < 1
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Words Per Page",
        text: "Enter a positive whole number.",
      });
      return;
    }

    if (!language) {
      await Swal.fire({
        icon: "warning",
        title: "Base Language Required",
        text: "Please enter the base language.",
      });
      return;
    }

    setSaving(true);

    try {
      const currentResponse = await fetch(SETTINGS_URL, {
        cache: "no-store",
      });

      const currentResult = await currentResponse.json();

      if (!currentResponse.ok || currentResult?.success === false) {
        throw new Error(
          currentResult?.message || "Unable to load existing settings."
        );
      }

      const current = currentResult.data || {};

      const payload = {
        currency: current.currency || "USD",
        pricePerPage: price,
        wordsPerPage: words,
        baseLanguage: language,
        baseLanguageMultiplier: Number(
          current.baseLanguageMultiplier ?? 1
        ),
        otherLanguageMultiplier: Number(
          current.otherLanguageMultiplier ?? 2
        ),
        minimumPages: Number(current.minimumPages ?? 1),
        maxFileSizeMB: Number(current.maxFileSizeMB ?? 100),
        isActive: current.isActive !== false,
      };

      const response = await fetch(SETTINGS_URL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || "Unable to save pricing settings."
        );
      }

      const saved = result.data || {};

      setPricePerPage(String(saved.pricePerPage ?? price));
      setWordsPerPage(String(saved.wordsPerPage ?? words));
      setBaseLanguage(saved.baseLanguage || language);

      invalidate(SETTINGS_URL);

      await Swal.fire({
        icon: "success",
        title: "Pricing Updated",
        text: `Settings saved. ${saved.wordsPerPage ?? words} words will count as one billable page.`,
        confirmButtonText: "OK",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.message || "Unable to save settings.",
        confirmButtonText: "OK",
      });
    } finally {
      setSaving(false);
    }
  };

  const removeSettings = async () => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Remove Word Pricing?",
      text: "The saved settings will be deleted. Default settings may be used when settings are requested again.",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    setRemoving(true);

    try {
      const response = await fetch(SETTINGS_URL, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || "Unable to remove pricing settings."
        );
      }

      invalidate(SETTINGS_URL);

      await Swal.fire({
        icon: "success",
        title: "Settings Removed",
        text: "Word pricing settings were removed successfully.",
        confirmButtonText: "OK",
      });

      await loadSettings(false);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Remove Failed",
        text: error.message || "Unable to remove settings.",
        confirmButtonText: "OK",
      });
    } finally {
      setRemoving(false);
    }
  };

  return (
    <main className="container-fluid py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Word-Based Pricing</h1>
        <p className="text-secondary mb-0">
          Configure pricing for documents uploaded by clients.
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
          <h2 className="h5 mb-1">Pricing Configuration</h2>
          <p className="text-secondary small mb-0">
            Set price per page, words per page and the base language.
          </p>
        </div>

        {loading ? (
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span>Loading pricing settings...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={saveSettings}>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="pricePerPage"
                    className="form-label fw-semibold"
                  >
                    Price per page (USD)
                  </label>

                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      id="pricePerPage"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      value={pricePerPage}
                      onChange={(event) =>
                        setPricePerPage(event.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="wordsPerPage"
                    className="form-label fw-semibold"
                  >
                    Words per page
                  </label>

                  <input
                    id="wordsPerPage"
                    type="number"
                    min="1"
                    step="1"
                    className="form-control"
                    value={wordsPerPage}
                    onChange={(event) =>
                      setWordsPerPage(event.target.value)
                    }
                    required
                  />

                  <small className="text-secondary">
                    Enter how many words count as one billable page.
                  </small>
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="baseLanguage"
                    className="form-label fw-semibold"
                  >
                    Base language
                  </label>

                  <input
                    id="baseLanguage"
                    type="text"
                    className="form-control"
                    value={baseLanguage}
                    onChange={(event) =>
                      setBaseLanguage(event.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card-footer bg-white border-top p-3 d-flex flex-wrap justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={removeSettings}
                disabled={saving || removing}
              >
                {removing ? "Removing..." : "Remove Settings"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => loadSettings()}
                disabled={saving || removing}
              >
                Reload Settings
              </button>

              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={saving || removing}
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}