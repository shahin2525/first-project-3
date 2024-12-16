import { TAssignSchedule } from './offeredCourse.interface';

const hasTimeConflict = (
  assignSchedules: TAssignSchedule[],
  newSchedule: TAssignSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existsStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existsEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existsEndTime && newEndTime > existsStartTime) {
      return true;
    }
  }
  return false;
};

export default hasTimeConflict;
