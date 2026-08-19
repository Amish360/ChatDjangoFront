import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import Card from './ui/Card';
import TextInput from './ui/TextInput';
import Toggle from './ui/Toggle';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, profile, updateProfile } = useAppData();

  const [bio, setBio] = useState(profile.bio);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');

  const handleSave = () => {
    updateProfile({ bio, email });
    setPassword('');
  };

  const handleLogOut = () => {
    navigate('/');
  };

  return (
    <div className="font-terra min-h-full bg-[#fcfaf7] p-4 md:p-6 pb-24 md:pb-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <h2 className="text-lg font-bold text-[#2f4d38] mb-4">Public Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <Avatar name={currentUser.name} size="lg" />
            <Button variant="outline" title="Coming soon">Change Photo</Button>
          </div>
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-[#f4f1ea] border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#4a7c59]"
          />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-lg font-bold text-[#2f4d38] mb-4">Account Security</h2>
            <TextInput
              label="Email"
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Password"
              id="profile-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-[#2f4d38] mb-4">Preferences</h2>
            <div className="space-y-4">
              <Toggle
                label="Notifications"
                checked={profile.notificationsEnabled}
                onChange={(checked) => updateProfile({ notificationsEnabled: checked })}
              />
              <Toggle
                label="Show my profile to others"
                checked={profile.profileVisible}
                onChange={(checked) => updateProfile({ profileVisible: checked })}
              />
            </div>
          </Card>
        </div>

        <div className="hidden md:flex justify-end gap-3">
          <Button variant="outline" onClick={handleLogOut}>Log Out</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="fixed bottom-16 inset-x-0 md:hidden bg-white border-t border-gray-100 p-4 flex gap-3 z-10">
        <Button variant="outline" onClick={handleLogOut} className="flex-1">Log Out</Button>
        <Button onClick={handleSave} className="flex-1">Save Changes</Button>
      </div>
    </div>
  );
};

export default Profile;
