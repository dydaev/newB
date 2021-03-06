<?php

namespace RomaChe\AuthBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use RomaChe\AuthBundle\Entity\Role;
use RomaChe\AuthBundle\AuthBundle;

/**
 * Users
 *
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="RomaChe\AuthBundle\Repository\UsersRepository")
 */
class Users implements UserInterface
{
  public function __construct()
    {
        $this->roles = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }
    public function toArray()
    {
      return array(
        'id'=> $this->id,
        'username'=>$this->username,
        'email'=>$this->email,
        'createdAt'=>$this->createdAt,
        'Roles'=>$this->getRolesNames(),
        'birthday'=>$this->birthday,
        'sex'=>$this->sex,
        'country'=>$this->country,
        'city'=>$this->city,
        'aboutSelf'=>$this->aboutSelf
      );
    }

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, unique=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;


     /**
      * @ORM\ManyToMany(targetEntity="Role", inversedBy="users", cascade="persist")
      * @ORM\JoinTable(name="user_roles",
      *     joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
      *     inverseJoinColumns={@ORM\JoinColumn(name="role_id", referencedColumnName="id")}
      * )
      *
      * @var ArrayCollection $roles
      */
    private $roles;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="birthday", type="date", nullable=true)
     */
    private $birthday;

    /**
     * @var bool
     *
     * @ORM\Column(name="sex", type="boolean", nullable=true)
     */
    private $sex;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=255, nullable=true)
     */
    private $country;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @var text
     *
     * @ORM\Column(name="aboutSelf", type="text", nullable=true)
     */
    private $aboutSelf;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     *
     * @return Users
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Users
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Users
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Get dateAdd
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Геттер для ролей пользователя.
     *
     * @return ArrayCollection A Doctrine ArrayCollection
     */
    public function getUserRoles()
    {
        return $this->roles;
    }

    /**
     * Геттер для массива ролей.
     *
     * @return array An array of Role objects
     */
    public function getRoles()
    {
        return $this->getUserRoles()->toArray();
    }

    /**
     * Getter for get array names of roles
     *
     * @return array An array of Role name
     */
    public function getRolesNames()
    {
        $roleNames = array();
        $roleNames = array_map(function($role){
          return $role->getName();
        }, $this->getUserRoles()->toArray());
        return $roleNames;
    }

    /**
     * Set birthday
     *
     * @param \Date $birthday
     *
     * @return Users
     */
    public function setBirthday($birthday)
    {
        $this->birthday = $birthday;

        return $this;
    }

    /**
     * Get birthday
     *
     * @return \Date
     */
    public function getBirthday()
    {
        return $this->birthday;
    }

    /**
     * Set sex
     *
     * @param boolean $sex
     *
     * @return Users
     */
    public function setSex($sex)
    {
        $this->sex = $sex;

        return $this;
    }

    /**
     * Get sex
     *
     * @return bool
     */
    public function getSex()
    {
        return $this->sex;
    }

    /**
     * Set country
     *
     * @param string $country
     *
     * @return Users
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set city
     *
     * @param string $city
     *
     * @return Users
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set aboutSelf
     *
     * @param string $aboutSelf
     *
     * @return Users
     */
    public function setAboutSelf($aboutSelf)
    {
        $this->aboutSelf = $aboutSelf;

        return $this;
    }

    /**
     * Get aboutSelf
     *
     * @return string
     */
    public function getAboutSelf()
    {
        return $this->aboutSelf;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    /**
     * Сравнивает пользователя с другим пользователем и определяет
     * один и тот же ли это человек.
     *
     * @param UserInterface $user The user
     * @return boolean True if equal, false othwerwise.
     */
    public function equals(UserInterface $user)
    {
        return md5($this->getUsername()) == md5($user->getUsername());
    }




    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Users
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Add role
     *
     * @param \RomaChe\AuthBundle\Entity\Role $role
     *
     * @return Users
     */
    public function addRole(\RomaChe\AuthBundle\Entity\Role $role)
    {
        $this->roles->add($role);
        return $this;
    }

    /**
     * Remove role
     *
     * @param \RomaChe\AuthBundle\Entity\Role $role
     */
    public function removeRole(\RomaChe\AuthBundle\Entity\Role $role)
    {
        $this->roles->removeElement($role);
    }

    /**
     * Set roles
     *
     * @param array $roles
     *
     * @return Users
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;

        return $this;
    }
}
