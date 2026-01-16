import { Meteor } from 'meteor/meteor';
import { profileSchema } from '../../modules/profile/ProfilePage';
import { Profiles } from './profileCollection';

Meteor.methods({
    async 'profiles.save'(data) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const parsed = profileSchema.safeParse(data);
        if (!parsed.success) {
            throw new Meteor.Error(
                'validation-error',
                parsed.error.errors.map(e => e.message).join(', ')
            );
        }
        const profileData = {
            ...parsed.data,
            userId: this.userId,
            updatedAt: new Date(),
        };
        const existing = await Profiles.findOneAsync({ userId: this.userId });
        if (existing) {
            await Profiles.updateAsync(existing._id, { $set: profileData });
            return existing._id;
        }


        const profile = await Profiles.findOneAsync({ userId: this.userId });

        return profile;
    },

    async 'profiles.get'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return await Profiles.findOneAsync({ userId: this.userId });
    }
});