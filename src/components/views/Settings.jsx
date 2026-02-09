import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "Product Manager",
    email: "admin@productmanager.com",
    currency: "USD",
    language: "English",
    timezone: "UTC",
    lowStockThreshold: 10,
    emailNotifications: true,
    lowStockAlerts: true,
    autoBackup: true,
    darkMode: false,
    theme: "light",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "custom");

    if (settings.theme === "dark") {
      root.classList.add("dark");
    }

    if (settings.theme === "custom") {
      root.classList.add("custom");
    }
  }, [settings.theme]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed/Sticky */}
      <aside className="w-64 bg-sky-900 text-white flex flex-col fixed h-screen">
        <div className="p-6 border-b border-sky-800">
          <h1 className="text-2xl font-bold">🎽Product Dashboard</h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📦 Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                📈 Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                🏷️ Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                ➕ Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded transition-colors ${isActive ? "bg-sky-700" : "hover:bg-sky-800"
                  }`
                }
              >
                ⚙️ Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-sky-800">
          <p className="text-sm text-gray-300">© 2024 Product Manager</p>
        </div>
      </aside>

      {/* Main Content - with margin for fixed sidebar */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-600">Manage your application preferences and configuration</p>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Settings saved successfully!</span>
            </div>
          )}

          {/* General Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏢</span> General Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="KHR">Khmer(៛)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                  >
                    <option value="English">English</option>
                    <option value="Khmer">Khmer</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inventory Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📦</span> Inventory Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Low Stock Threshold</label>
                <input
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleChange('lowStockThreshold', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
                  min="1"
                />
                <p className="text-sm text-gray-500 mt-1">Alert when product quantity falls below this number</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>🔔</span> Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive email updates about your inventory</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Get notified when products are running low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.lowStockAlerts}
                    onChange={(e) => handleChange('lowStockAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Auto Backup</p>
                  <p className="text-sm text-gray-600">Automatically backup data daily</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleChange('autoBackup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-900"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>🎨</span> Appearance
            </h3>

            <div className="space-y-4">
              {/* Light */}
              <div
                onClick={() => handleChange("theme", "light")}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${settings.theme === "light"
                    ? "bg-sky-100 border-2 border-sky-700"
                    : "bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <div>
                  <p className="font-medium text-gray-800">Light Mode</p>
                  <p className="text-sm text-gray-600">Bright interface</p>
                </div>
                <span className="text-xl">☀️</span>
              </div>

              {/* Dark */}
              <div
                onClick={() => handleChange("theme", "dark")}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${settings.theme === "dark"
                    ? "bg-sky-100 border-2 border-sky-700"
                    : "bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <div>
                  <p className="font-medium text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-600">Low-light interface</p>
                </div>
                <span className="text-xl">🌙</span>
              </div>

              {/* Custom */}
              <div
                onClick={() => handleChange("theme", "custom")}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${settings.theme === "custom"
                    ? "bg-sky-100 border-2 border-sky-700"
                    : "bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <div>
                  <p className="font-medium text-gray-800">Custom Mode</p>
                  <p className="text-sm text-gray-600">Custom colors & style</p>
                </div>
                <span className="text-xl">✨</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-200"
            >
              Save Changes
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg transition duration-200">
              Reset to Default
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;