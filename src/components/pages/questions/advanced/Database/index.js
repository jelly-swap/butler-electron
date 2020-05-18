import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Input from '../../../../common/Input';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import { DATABASES, UI_DB_NAMES } from '../../../../../constants';

import './style.scss';

const Database = ({ selectedDatabase, isButlerStarted, getState }) => {
  const [database, setDatabase] = useState({ active: 'sqlite' });
  const [isValid, setIsValid] = useState(true);

  useGetStateFromCP(isButlerStarted, getState, { DATABASE: database });

  useEffect(() => {
    if (!selectedDatabase) return;

    const { ACTIVE } = selectedDatabase;
    const active = ACTIVE.toLowerCase();

    let db;

    switch (active) {
      case 'mongodb': {
        db = selectedDatabase.MONGODB;
        break;
      }
      case 'sqlite': {
        db = selectedDatabase.SQLITE;
        break;
      }
      default:
        break;
    }

    setDatabase({
      active: active,
      ...(active === 'mongodb' && {
        url: db.URL,
        auth: db.AUTH,
        password: db.MONGO_PASSWORD,
      }),
    });

    setIsValid(true);
  }, [selectedDatabase]);

  useEffect(() => {
    const { active, url, auth, password } = database;

    if (active === 'mongodb' && (!url || !auth || !password)) {
      setIsValid(false);
    } else if (active === 'mongodb') {
      setIsValid(true);
    }
  }, [database]);

  const handleDbOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    setDatabase({
      active: value,
      ...(value === 'mongodb' && {
        url: '',
        auth: '',
        password: '',
      }),
    });

    value === 'mongodb' ? setIsValid(false) : setIsValid(true);
  };

  const handleDbDataOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setDatabase({
      ...database,
      [name]: value,
    });
  };

  return (
    <div className='database-wrapper'>
      <QuestionTitle isValid={isValid} title='Database' />
      <div className='db-radio-wrapper'>
        {DATABASES.map(db => (
          <div key={db}>
            <Input id={db} type='radio' value={db} onChange={handleDbOnChange} checked={db === database.active} />
            <label htmlFor={db}>{UI_DB_NAMES[db]}</label>
            <div className={`check`}></div>
          </div>
        ))}
      </div>

      {database.active === 'mongodb' && (
        <div className='mongo-db-wrapper'>
          <Input type='text' placeholder='URL' onChange={handleDbDataOnChange} name='url' value={database.url} />
          <Input type='text' placeholder='Auth' onChange={handleDbDataOnChange} name='auth' value={database.auth} />
          <Input
            type='text'
            placeholder='Password'
            onChange={handleDbDataOnChange}
            name='password'
            value={database.password}
          />
        </div>
      )}
    </div>
  );
};

export default Database;
