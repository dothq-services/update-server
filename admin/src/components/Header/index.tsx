import React from 'react';
import { Button } from '../Button'

export const Header = () => {
  return (
    <>
        <nav className={`nav-nb`}>
          <div className={`nav-container`}>
            <div className={'nav-left'}>
              <a href={'/'}>
                <i className={'dot-icon'} />
              </a>
              <ul className={'nav-items'}>
                <a href={'/updates'}>Updates</a>
                <a href={'/updates/add'}>Add an Update</a>
                <span />
                <a href={'/targets'}>Targets</a>
                <a href={'/locales'}>Locales</a>
              </ul>
            </div>
  
            <div className={'nav-right'}>
              <Button type={'primary'} href={'/id/login'}>
                Sign in
              </Button>
            </div>
          </div>
        </nav>
      </>
  )
}