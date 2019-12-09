import React from 'react';
import { Button } from "rbx";
import {db} from '../../utils';
import {timeParts, hasConflict, getCourseTerm} from './times'

const getCourseNumber = course => (
  course.id.slice(1, 4)
)

const buttonColor = selected => (
  selected ? 'success' : null
);

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};

const Course = ({ course, state, user }) => (
  <Button
    data-cy="course"
    color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }
    >
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

export {Course}
