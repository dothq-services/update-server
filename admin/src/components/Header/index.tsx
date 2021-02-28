import React from 'react';
import { Button } from '@material-ui/core'

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
              </ul>
            </div>
  
            <div className={'nav-right'}>
              <Button color="primary" variant="contained" disableElevation href={'/id/login'}>
                Sign in
              </Button>
            </div>
          </div>
        </nav>
      </>
  )
}